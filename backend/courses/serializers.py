from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'code', 'title', 'description', 
                 'credit_hours', 'department', 'subject', 'is_active']
        read_only_fields = ['id', 'is_active', 'created_at', 'updated_at']