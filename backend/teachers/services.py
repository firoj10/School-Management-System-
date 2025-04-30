from django.db import transaction

from core.models import User
from teachers.models import Teacher
from core.utils import generate_random_password, send_custom_email

class TeacherService:
    @staticmethod
    @transaction.atomic
    def create_teacher(data) -> User:
        email = data['email']

        if User.objects.filter(email=email).exists():
            raise ValueError("A user with this email already exists.")

        password = generate_random_password()

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            role='teacher',
            first_name=data['first_name'],
            last_name=data['last_name'],
        )

        Teacher.objects.create(
            user=user,
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=email,
            date_of_birth=data['date_of_birth'],
            photo=data.get('photo'),
        )

        login_url = "https://your-frontend.com/login"
        subject = "Welcome to the School – Your Teacher Account"
        message = (
            f"Dear {data['first_name']},\n\n"
            "Your teacher account has been created successfully.\n\n"
            f"Username: {email}\n"
            f"Password: {password}\n\n"
            f"Login here: {login_url}\n\n"
            "Regards,\nSchool Admin"
        )
        send_custom_email(subject, message, email)

        return user
