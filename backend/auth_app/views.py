import random
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache  # Using Redis cache
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from social_django.utils import psa  # For social auth
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not all([username, password, email]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate 4-digit OTP
        otp = str(random.randint(1000, 9999))

        # Cache OTP and pending user data with 5-min expiration (300 seconds)
        pending_data = {'username': username, 'password': password, 'email': email}
        cache.set(f'otp_{email}', {'otp': otp, 'data': pending_data}, timeout=300)

        # Send OTP via email
        send_mail(
            'Your OTP for Registration',
            f'Your OTP is {otp}. It expires in 5 minutes.',
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )

        return Response({'message': 'OTP sent to your email. Please verify.'}, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        cached_data = cache.get(f'otp_{email}')
        if not cached_data or cached_data['otp'] != otp:
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        user = User.objects.create_user(
            username=cached_data['data']['username'],
            password=cached_data['data']['password'],
            email=cached_data['data']['email']
        )
        user.save()

        # Clear cache
        cache.delete(f'otp_{email}')

        #Send Email Notification
        send_mail(
            'Registration Successful',
            f'Your account has been successfully created on Xitei App.',
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )
        
        # Generate JWT
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Registration successful'
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email_or_username = request.data.get('emailOrUsername')
        password = request.data.get('password')

        if not email_or_username or not password:
            return Response({'error': 'Email/Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = None
        try:
            # Try by username first
            user = User.objects.get(username=email_or_username)
        except ObjectDoesNotExist:
            try:
                # If not, try by email
                user = User.objects.get(email=email_or_username)
            except ObjectDoesNotExist:
                pass

        if user and user.check_password(password):
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class ValidateTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'valid': True, 'username': request.user.username, 'email': request.user.email})

# Callback is handled by social_django URLs (see urls.py below)
