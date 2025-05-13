from django.db import models
from core.models import User

def teacher_photo_path(instance, filename):
    return f"teachers/photos/{instance.user.id}/{filename}"

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    date_of_birth = models.DateField()
    photo = models.ImageField(upload_to=teacher_photo_path, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    status = models.CharField(max_length=20, default='Active')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    
