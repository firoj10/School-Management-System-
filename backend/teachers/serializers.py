from rest_framework import serializers
from .models import Teacher

class TeacherCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['first_name', 'last_name', 'email', 'date_of_birth', 'photo','phone']

class TeacherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
