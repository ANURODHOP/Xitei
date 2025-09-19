from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('auth_app.urls')),  # Adjust app name as needed
    path('api/products/', include('products.urls')),  # Products app URLs
    path('api/cart/', include('cart.urls')),  # Products app URLs
    path('api/payment/', include('payment.urls')),  # Products app URLs
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)