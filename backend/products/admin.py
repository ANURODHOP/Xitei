from django.contrib import admin
from .models import Product, Category

class ProductAdmin(admin.ModelAdmin):
    # Fields to display in the list view for easy browsing
    list_display = ('name', 'price', 'stocks', 'category', 'created_by', 'created_at')
    
    # Search functionality for quick lookups
    search_fields = ('name', 'description')
    
    # Filters for narrowing down lists
    list_filter = ('category', 'created_by', 'created_at')
    
    # Customize the add/edit form
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'price', 'stocks', 'category', 'image')
        }),
        ('Advanced', {
            'fields': ('created_by', 'created_at'),
            'classes': ('collapse',),  # Optional: Collapse this section by default
        }),
    )
    
    # Make auto-generated fields read-only
    readonly_fields = ('created_at', 'created_by')
    
    # Automatically set created_by to the current user when adding a product
    def save_model(self, request, obj, form, change):
        if not change:  # Only set on creation
            obj.created_by = request.user
        super().save_model(request, obj, form, change)

# Register the models with the admin site
admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
