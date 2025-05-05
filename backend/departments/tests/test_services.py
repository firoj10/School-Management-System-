from django.test import TestCase
from django.core.exceptions import ValidationError
from departments.services import DepartmentService
from departments.models import Department  # Correct import path

class DepartmentServiceTests(TestCase):
    """Test cases for DepartmentService functionality"""
    
    def test_create_department_success(self):
        """Test successful department creation"""
        dept = DepartmentService.create_department(
            code='CSE',
            name='Computer Science'
        )
        self.assertEqual(dept.code, 'CSE')
        self.assertTrue(dept.is_active)

    def test_unique_code_validation(self):
        """Test duplicate code validation"""
        DepartmentService.create_department(code='EEE', name='Electrical')
        with self.assertRaises(ValidationError):
            DepartmentService.create_department(code='EEE', name='Duplicate')

    def test_update_department_success(self):
        """Test successful department update"""
        dept = DepartmentService.create_department(code='OLD', name='Old Dept')
        updated = DepartmentService.update_department(dept.id, code='NEW', name='New Dept')
        self.assertEqual(updated.code, 'NEW')
        self.assertEqual(updated.name, 'New Dept')

    def test_deactivate_department(self):
        """Test department deactivation"""
        dept = DepartmentService.create_department(code='TEMP', name='Temporary')
        DepartmentService.deactivate_department(dept.id)
        dept.refresh_from_db()
        self.assertFalse(dept.is_active)