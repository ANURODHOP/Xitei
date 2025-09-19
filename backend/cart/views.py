from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product

class CartDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        session_id = request.session.session_key
        if not session_id:
            request.session.create()
            session_id = request.session.session_key
        cart, created = Cart.objects.get_or_create(user=user, session_id=session_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class AddToCartView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user if request.user.is_authenticated else None
        session_id = request.session.session_key
        if not session_id:
            request.session.create()
            session_id = request.session.session_key
        cart, created = Cart.objects.get_or_create(user=user, session_id=session_id)

        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        new_quantity = item.quantity + quantity if not created else quantity
        if new_quantity > product.stocks:
            return Response({"error": "Out of stocks"}, status=status.HTTP_400_BAD_REQUEST)
        item.quantity = new_quantity
        item.save()

        return Response({"message": "Item added/updated"}, status=status.HTTP_201_CREATED)

class UpdateCartItemView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def patch(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        quantity = int(request.data.get('quantity', item.quantity))
        if quantity < 1 or quantity > item.product.stocks:
            return Response({"error": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)
        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)

class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def delete(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        item.delete()
        return Response({"message": "Item removed"}, status=status.HTTP_204_NO_CONTENT)
