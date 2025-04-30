from django.db import transaction
from core.models import User
from students.models import Student, StudentApplication
from core.utils import generate_random_password, send_custom_email
# students/services.py# students/services.py



class StudentApplicationService:
    @staticmethod
    @transaction.atomic
    def approve(application_id: str) -> User:
        """
        Approve a pending StudentApplication:
        - Generate password
        - Create User
        - Link User to existing or newly created Student record
        - Update application status
        - Send credentials by email
        """
        try:
            app = StudentApplication.objects.select_for_update().get(
                id=application_id, status='pending'
            )
        except StudentApplication.DoesNotExist:
            raise ValueError("Application not found or not pending")

        # 1) Generate password
        password = generate_random_password()

        # 2) Create Django auth User
        user = User.objects.create_user(
            username=app.email,
            email=app.email,
            password=password,
            role='student',
            first_name=app.first_name,
            last_name=app.last_name,
        )

        # 3) Link to existing or create new Student record
        try:
            student = Student.objects.get(application=app)
        except Student.DoesNotExist:
            student = Student.objects.create(
                first_name=app.first_name,
                last_name=app.last_name,
                dob=app.date_of_birth,
                email=app.email,
                status='Active',  # Set default status
                application=app
            )

        student.user = user
        student.save(update_fields=['user'])

        # 4) Mark application approved
        app.status = 'approved'
        app.save(update_fields=['status'])

        # 5) Send email
        login_url = "https://your-frontend.com/login"
        subject = "Admission Approved – Your Login Credentials"
        message = (
            f"Dear {app.first_name},\n\n"
            "Congratulations! Your admission has been approved.\n\n"
            f"Username: {app.email}\n"
            f"Password: {password}\n\n"
            f"Login here: {login_url}\n\n"
            "Regards,\nSchool Admin"
        )
        send_custom_email(subject, message, app.email)

        return user
    
    
    @staticmethod
    @transaction.atomic
  
    def reject(pk):
        try:
            application = StudentApplication.objects.get(pk=pk)
            if application.status != 'pending':
                raise ValueError("Only pending applications can be rejected.")
            application.status = 'rejected'
            application.save()
        except StudentApplication.DoesNotExist:
            raise ValueError("Application not found.")