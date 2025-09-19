from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

def send_token(strategy, backend, user, *args, **kwargs):
    if user is None:
        return

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    frontend_url = 'http://localhost:5173/oauth-success'
    redirect_url = f"{frontend_url}?token={access_token}"

    return strategy.redirect(redirect_url)
