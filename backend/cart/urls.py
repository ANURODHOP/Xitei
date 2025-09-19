from django.urls import path
from .views import CartDetailView, AddToCartView, UpdateCartItemView, RemoveFromCartView

urlpatterns = [
    path('', CartDetailView.as_view(), name='cart_detail'),  # GET/UPDATE cart
    path('add/', AddToCartView.as_view(), name='add_to_cart'),
    path('items/<int:pk>/update/', UpdateCartItemView.as_view(), name='update_cart_item'),
    path('items/<int:pk>/remove/', RemoveFromCartView.as_view(), name='remove_from_cart'),
]
