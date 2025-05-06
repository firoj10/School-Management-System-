from rest_framework.test import APITestCase
from django.urls import reverse
from departments.models import Department,Subject
from courses.models import Course

class CourseAPITestCase(APITestCase):
    def setUp(self):
        self.dept = Department.objects.create(name="CSE")
        
        self.subject = Subject.objects.create(
            code="CSE-101", name="Intro CS", credits=3, department=self.dept
        )
        self.list_url = reverse('course-list')

    def test_list_courses_empty(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data'], [])

    def test_create_course(self):
        payload = {
            'code': 'CSE-301',
            'title': 'OS',
            'description': 'Operating Systems',
            'credit_hours': 4,
            'department': self.dept.id,
            'subject': self.subject.id
        }
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data']['code'], payload['code'])

    def test_retrieve_course(self):
        course = Course.objects.create(
            code='CSE-302', title='DB', description='', credit_hours=3,
            department=self.dept, subject=self.subject
        )
        url = reverse('course-detail', args=[course.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['id'], course.id)

    def test_update_course(self):
        course = Course.objects.create(
            code='CSE-303', title='AI', description='', credit_hours=3,
            department=self.dept, subject=self.subject
        )
        url = reverse('course-detail', args=[course.id])
        response = self.client.patch(url, {'title': 'Artificial Intelligence'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['title'], 'Artificial Intelligence')

    def test_delete_course(self):
        course = Course.objects.create(
            code='CSE-304', title='ML', description='', credit_hours=3,
            department=self.dept, subject=self.subject
        )
        url = reverse('course-detail', args=[course.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        course.refresh_from_db()
        self.assertFalse(course.is_active)