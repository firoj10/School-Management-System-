from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.auth import get_user_model

User = get_user_model()

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ('C', 'Created'),
        ('U', 'Updated'),
        ('D', 'Deleted'),
        ('L', 'Login'),
        ('O', 'Logout'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=1, choices=ACTION_CHOICES)
    content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    details = models.JSONField(default=dict)

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]

    def __str__(self):
        return f"{self.get_action_display()} on {self.content_type}"