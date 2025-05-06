
from rest_framework import serializers
from .models import Department,Subject

class DepartmentSerializer(serializers.ModelSerializer):
    """
    Serializes Department model data for API interactions
    """
    class Meta:
        model = Department
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'code': {
                'help_text': "Unique department code (3-10 uppercase letters)",
                'trim_whitespace': False
            },
            'name': {'help_text': "Official department name"}
        }

    def validate_code(self, value):
        """Validate department code format and uniqueness"""
        value = value.strip().upper()
        if Department.objects.filter(code=value).exists():
            raise serializers.ValidationError("Department code must be unique.")
        return value
    
    
    
    


class SubjectSerializer(serializers.ModelSerializer):
    # department_detail = DepartmentSerializer(source='department', read_only=True)

    class Meta:
        model = Subject
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'code': {
                'help_text': 'Unique subject code (e.g. CSE-101)',
                'trim_whitespace': False
            },
            'credits': {
                'min_value': 1,
                'help_text': 'Minimum 1 credit required'
            }
        }

    def validate_code(self, value):
        value = value.strip().upper()
        if Subject.objects.filter(code=value).exists():
            raise serializers.ValidationError("Subject code must be unique")
        return value