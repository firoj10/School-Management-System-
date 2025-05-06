from django.test import TestCase
from django.core.exceptions import ValidationError
from courses.services import CourseService
from courses.models import Course
from departments.models import Department,Subject


class CourseServiceTestCase(TestCase):
    def setUp(self):
        self.dept = Department.objects.create(name="CSE")
        self.subject = Subject.objects.create(
            code="CSE-101", name="Intro CS", credits=3, department=self.dept
        )

    def test_create_course_success(self):
        data = {
            'code': 'CSE-201',
            'title': 'Data Structures',
            'description': 'Desc',
            'credit_hours': 3,
            'department': self.dept,
            'subject': self.subject
        }
        course = CourseService.create_course(**data)
        self.assertIsInstance(course, Course)
        self.assertEqual(course.code, data['code'])

    def test_create_course_duplicate_code(self):
        CourseService.create_course(
            code='CSE-201', title='X', description='', credit_hours=1,
            department=self.dept, subject=self.subject
        )
        with self.assertRaises(ValidationError):
            CourseService.create_course(
                code='CSE-201', title='Y', description='', credit_hours=1,
                department=self.dept, subject=self.subject
            )

    def test_update_course_success(self):
        course = CourseService.create_course(
            code='CSE-202', title='Alg', description='', credit_hours=3,
            department=self.dept, subject=self.subject
        )
        updated = CourseService.update_course(course.pk, title='Algorithms')
        self.assertEqual(updated.title, 'Algorithms')

    def test_update_course_not_found(self):
        with self.assertRaises(ValidationError):
            CourseService.update_course(999, title='Nope')

    def test_delete_course(self):
        course = CourseService.create_course(
            code='CSE-203', title='Net', description='', credit_hours=3,
            department=self.dept, subject=self.subject
        )
        deleted = CourseService.delete_course(course.pk)
        self.assertFalse(deleted.is_active)