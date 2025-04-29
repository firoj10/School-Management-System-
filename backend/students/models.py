import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone

# Django এর AUTH_USER_MODEL থেকেই User পাওয়া যাবে
User = settings.AUTH_USER_MODEL

class StudentApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name     = models.CharField(max_length=100)
    last_name      = models.CharField(max_length=100, blank=True, null=True)
    date_of_birth  = models.DateField()
    parent_name    = models.CharField(max_length=150)
    parent_contact = models.CharField(max_length=20)
    email          = models.EmailField()
    applied_at     = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name or ''} – {self.status}"

class Student(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        help_text="Linked Django auth user (set on approval)."
    )
    application = models.OneToOneField(
        StudentApplication,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        help_text="Original application record."
    )

    first_name = models.CharField(max_length=100)
    last_name  = models.CharField(max_length=100, blank=True, null=True)
    dob        = models.DateField()
    gender     = models.CharField(
        max_length=10,
        choices=[('Male','Male'),('Female','Female'),('Other','Other')]
    )
    email      = models.EmailField(unique=True)
    phone      = models.CharField(max_length=15, blank=True, null=True)
    address    = models.TextField()
    status     = models.CharField(
        max_length=10,
        choices=[('Active','Active'),('Inactive','Inactive')],
        default='Active'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name or ''} ({self.status})"
