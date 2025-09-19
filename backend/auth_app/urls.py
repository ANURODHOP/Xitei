from django.urls import path, include
from .views import RegisterView, VerifyOTPView, LoginView, ValidateTokenView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('social/', include('social_django.urls', namespace='social')),  # Handles OAuth callbacks
    path('validate-token/', ValidateTokenView.as_view(), name='validate-token'),  
]
