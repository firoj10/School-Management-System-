from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from audit.registry import AuditModelRegistry

class Department(models.Model):
    """
    Represents an academic department
    """
    code = models.CharField(max_length=10, unique=True, help_text="Unique department code (e.g., CSE, EEE)")
    name = models.CharField(max_length=100, help_text="Full name of the department")
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['code']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"

    def clean(self):
        # Validate code format
        if not self.code.isupper():
            raise ValidationError("Department code must be in uppercase.")
        if ' ' in self.code.strip():
            raise ValidationError("Department code cannot contain spaces.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

# Register Department for auditing
AuditModelRegistry.register(Department)  # Moved outside class
        
class Subject(models.Model):
    code = models.CharField(
        max_length=20,
        unique=True,
        help_text="Unique subject code (e.g. CSE-101)"
    )
    name = models.CharField(max_length=200)
    credits = models.IntegerField(validators=[MinValueValidator(1)])
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='subjects'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"

# Register Subject for auditing
# AuditModelRegistry.register(Subject)  # Added for Subject