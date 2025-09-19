from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product, Category
from .serializers import ProductSerializer

# Create your views here.

class ProductListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        try:
            products  = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Problem Viewing the serializers'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Product Create View (Admin: Add single product with image)
class ProductCreateView(APIView):
    permission_classes = [IsAdminUser]
    parser_classes = (MultiPartParser, FormParser)  # Supports file uploads
    
    def post(self, request):
        try:
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                # Handle category creation if provided
                category_name = request.data.get('category')
                if category_name:
                    category, _ = Category.objects.get_or_create(name=category_name)
                    serializer.validated_data['category'] = category
                serializer.save(created_by=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Problem creating the product: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)