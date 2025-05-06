
from django.db import models
from django.core.validators import MinValueValidator
from departments.models import Department,Subject


class Course(models.Model):
    
    
    code = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=200)  # Correct field name
    credit_hours = models.IntegerField()
    
  
    description = models.TextField(blank=True)
    credit_hours = models.IntegerField(
        validators=[MinValueValidator(1)]
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='courses'
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='courses'
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
        return f"{self.code} - {self.title}"