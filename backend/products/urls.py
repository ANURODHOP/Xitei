from django.urls import path
from .views import ProductListView, ProductCreateView

urlpatterns = [
    path('', ProductListView.as_view(), name='product-list'),  # GET: View all products (public)
    path('create/', ProductCreateView.as_view(), name='product-create'),  # POST: Add single product (admin)
]
