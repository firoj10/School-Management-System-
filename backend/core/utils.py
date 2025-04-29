# core/utils.py
import random
import string
from django.core.mail import send_mail

def generate_random_password(length: int = 8) -> str:
    """
    Generate a secure random alphanumeric password.
    """
    chars = string.ascii_letters + string.digits
    return ''.join(random.choices(chars, k=length))

def send_custom_email(subject: str, message: str, to_email: str) -> None:
    """
    Centralized email sender.
    """
    send_mail(
        subject=subject,
        message=message,
        from_email='mdfirojhasan.info@gmail.com',
        recipient_list=[to_email],
        fail_silently=False,
    )
