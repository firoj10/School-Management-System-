from django.core.exceptions import ValidationError
from .models import Department

class DepartmentService:
    """
    Service layer for handling department-related business logic
    """
    
    @staticmethod
    def create_department(code, name, description=None):
        """
        Create a new department with validation
        """
        if not code or not name:
            raise ValidationError("Both code and name are required")
            
        if Department.objects.filter(code=code.upper()).exists():
            raise ValidationError("Department code must be unique")

        return Department.objects.create(
            code=code.upper(),
            name=name,
            description=description,
            is_active=True
        )

    @staticmethod
    def update_department(department_id, **kwargs):
        """
        Update existing department with validation
        """
        department = Department.objects.get(pk=department_id)
        
        if 'code' in kwargs:
            new_code = kwargs['code'].upper()
            if Department.objects.exclude(pk=department_id).filter(code=new_code).exists():
                raise ValidationError("Department code must be unique")
            kwargs['code'] = new_code

        for attr, value in kwargs.items():
            setattr(department, attr, value)
        department.save()
        return department

    @staticmethod
    def deactivate_department(department_id):
        """
        Soft delete a department by deactivating it
        """
        department = Department.objects.get(pk=department_id)
        department.is_active = False
        department.save()
        return department

    @staticmethod
    def get_active_departments():
        """Retrieve all active departments"""
        return Department.objects.filter(is_active=True)

    @staticmethod
    def get_department_by_id(department_id):
        """Retrieve single department by ID"""
        return Department.objects.get(pk=department_id, is_active=True)