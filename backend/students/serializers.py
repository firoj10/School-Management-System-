from rest_framework import serializers
from .models import Student
    
from .models import StudentApplication
import datetime
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
        extra_kwargs = {
            'first_name': {
                'error_messages': {
                    'required': 'first_name field is required.',  # When missing
                    'blank': 'first_name field is required.'      # When empty string
                }
            },
            'dob': {
                'error_messages': {
                    'required': 'dob field is required.',  # When missing
                    'invalid': 'dob has wrong format. Use YYYY-MM-DD.'
                }
            },
            'email': {
                'error_messages': {
                    'required': 'email field is required.',  # When missing
                    'blank': 'email field is required.'      # When empty string
                }
            },
            'phone': {
                'error_messages': {
                    'max_length':  ' phone Ensure this field has no more than 15 characters.'
                }
            }
        }

    def validate(self, attrs):
        import datetime
        if attrs.get('dob') and attrs['dob'] > datetime.date.today():
            raise serializers.ValidationError({"dob": "Date of birth cannot be in the future."})
        return attrs


class StudentApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentApplication
        fields = '__all__'
        read_only_fields = ['applied_at', 'status']
        extra_kwargs = {
            'first_name': {
                'error_messages': {
                    'required': 'First name is required.',
                    'blank': 'First name cannot be blank.'
                }
            },
            'last_name': {
                'error_messages': {
                    'required': 'Last name is required.',
                    'blank': 'Last name cannot be blank.'
                }
            },
            'email': {
                'error_messages': {
                    'required': 'Email is required.',
                    'blank': 'Email cannot be blank.'
                }
            },
            'parent_name': {
                'error_messages': {
                    'required': 'Parent name is required.',
                    'blank': 'Parent name cannot be blank.'
                }
            },
            'parent_contact': {
                'error_messages': {
                    'required': 'Parent contact is required.',
                    'blank': 'Parent contact cannot be blank.'
                }
            }
        }

    def validate(self, attrs):
        if attrs.get('date_of_birth') and attrs['date_of_birth'] > datetime.date.today():
            raise serializers.ValidationError({"date_of_birth": "Date of birth cannot be in the future."})
        return attrs
