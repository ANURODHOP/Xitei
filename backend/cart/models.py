from django.db import models
from django.conf import settings
from products.models import Product  # Adjust if your Product model is elsewhere

class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)  # For logged-in users
    session_id = models.CharField(max_length=100, null=True, blank=True)  # For anonymous/guest carts
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart for {self.user or self.session_id}"

    def get_total(self):
        return sum(item.get_subtotal() for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    def get_subtotal(self):
        return self.product.price * self.quantity