from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from departments.models import Department  # Correct import path

class DepartmentViewTests(APITestCase):
    """Test cases for Department API endpoints"""
    
    def setUp(self):
        self.department = Department.objects.create(
            code='TEST',
            name='Test Department',
            is_active=True
        )

    def test_get_department_list(self):
        """Test retrieving department list"""
        url = reverse('departments:department-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_department(self):
        """Test creating a new department"""
        url = reverse('departments:department-list')
        data = {'code': 'NEW', 'name': 'New Department'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_department(self):
        """Test updating a department"""
        url = reverse('departments:department-detail', kwargs={'pk': self.department.pk})
        data = {'name': 'Updated Name'}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.department.refresh_from_db()
        self.assertEqual(self.department.name, 'Updated Name')