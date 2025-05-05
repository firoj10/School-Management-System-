# from django.db import models
# from django.core.validators import RegexValidator
# from django.utils.translation import gettext_lazy as _

# class Department(models.Model):
#     code_validator = RegexValidator(
#         regex=r'^[A-Z]{2,10}$',
#         message=_('Department code must be uppercase letters only')
#     )

#     code = models.CharField(
#         _('Department Code'),
#         max_length=10,
#         unique=True,
#         validators=[code_validator],
#         help_text=_('Unique department identifier (e.g. CSE, ECE)')
#     )
#     name = models.CharField(
#         _('Department Name'),
#         max_length=100,
#         help_text=_('Official department name')
#     )
#     description = models.TextField(
#         _('Description'),
#         blank=True,
#         null=True
#     )
#     is_active = models.BooleanField(
#         _('Active Status'),
#         default=True
#     )
#     created_at = models.DateTimeField(
#         _('Created At'),
#         auto_now_add=True
#     )
#     updated_at = models.DateTimeField(
#         _('Updated At'),
#         auto_now=True
#     )

#     class Meta:
#         verbose_name = _('Department')
#         verbose_name_plural = _('Departments')
#         ordering = ['code']
#         indexes = [
#             models.Index(fields=['code']),
#             models.Index(fields=['is_active']),
#         ]

#     def __str__(self):
#         return f"{self.code} - {self.name}"

#     def delete(self, *args, **kwargs):
#         """Soft delete implementation"""
#         self.is_active = False
#         self.save()
from django.db import models
from django.core.exceptions import ValidationError

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