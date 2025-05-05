# from rest_framework import serializers
# from .models import Department
# from django.utils.translation import gettext_lazy as _

# class DepartmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Department
#         fields = '__all__'
#         read_only_fields = ('created_at', 'updated_at')
#         extra_kwargs = {
#             'code': {
#                 'required': False,  
#                 'validators': []  #
#             }
#         }

#     def validate_code(self, value):
#         """কোড আপডেটের সময় শুধু ভ্যালিডেশন"""
#         if self.instance and value:  
#             if Department.objects.exclude(pk=self.instance.pk).filter(code=value).exists():
#                 raise serializers.ValidationError("Department code must be unique")
#         return value
from rest_framework import serializers
from .models import Department

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