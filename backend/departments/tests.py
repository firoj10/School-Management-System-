from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Department

class DepartmentAPITests(APITestCase):
    def setUp(self):
        self.department = Department.objects.create(
            code='CSE',
            name='Computer Science',
            is_active=True
        )

    def test_get_department_list(self):
        url = reverse('departments:department-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid_department(self):
        url = reverse('departments:department-list')
        data = {'code': 'EEE', 'name': 'Electrical Engineering'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_valid_department(self):
        url = reverse('departments:department-detail', kwargs={'pk': self.department.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_department(self):
        url = reverse('departments:department-detail', kwargs={'pk': self.department.pk})
        data = {'name': 'Computer Science & Engineering'}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_department(self):
        url = reverse('departments:department-detail', kwargs={'pk': self.department.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_create_invalid_department(self):
        url = reverse('departments:department-list')
        data = {'code': '', 'name': ''}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)