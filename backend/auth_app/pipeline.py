# auth_app/pipeline.py
from rest_framework_simplejwt.tokens import RefreshToken

def generate_jwt_token(backend, user, response, *args, **kwargs):
    if not user:
        return

    # Generate JWT
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    # Get the configured redirect URL and append token (for dev; avoid in prod)
    redirect_url = backend.strategy.setting('LOGIN_REDIRECT_URL')  # Uses your settings.py value
    redirect_url += f'?access={access_token}'  # Attach token as query param

    # Return to trigger redirect
    return backend.strategy.redirect(redirect_url)
