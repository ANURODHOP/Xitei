import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from cart.models import Cart
from django.core.mail import send_mail

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cart_data = request.data.get('cart')
        if not cart_data or not isinstance(cart_data, list) or len(cart_data) == 0:
            return Response({'error': 'Cart is empty'}, status=400)
        try:
            amount = 0
            for item in cart_data:
                price = float(item.get('product', {}).get('price', 0))
                quantity = int(item.get('quantity', 0))
                if price < 0 or quantity <= 0:
                    return Response({'error': 'Invalid price or quantity in cart'}, status=400)
                amount += price * quantity
            amount_cents = int(amount * 100)
            intent = stripe.PaymentIntent.create(
                amount=amount_cents,
                currency='usd',
                automatic_payment_methods={'enabled': True},
            )
            return Response({'clientSecret': intent.client_secret})
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class ConfirmPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payment_intent_id = request.data.get('payment_intent_id')

        try:
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)

            if intent.status == 'succeeded':
                cart = Cart.objects.filter(user=request.user).first()

                product_list = "\n".join([f"{item.product.name} x{item.quantity}" for item in cart.items.all()])
                cart.items.all().delete()  # Empty cart

                # Send email confirmation
                send_mail(
                    'Order Confirmation - Xitei',
                    f'Thank you for your purchase! Your delivery is being processed.\n\nOrder Details:\n{product_list}',
                    settings.EMAIL_HOST_USER,
                    [request.user.email],
                    fail_silently=False,
                )
                return Response({'message': 'Payment confirmed and cart cleared'})
            else:
                return Response({'error': 'Payment not successful'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
