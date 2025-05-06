from django.core.exceptions import ValidationError
from .models import Course
from django.core.exceptions import ValidationError
from .models import Course

class CourseService:
    @staticmethod
    def create_course(**data):
        if Course.objects.filter(code=data.get('code')).exists():
            raise ValidationError("Course with this code already exists.")
        return Course.objects.create(**data)

    @staticmethod
    def update_course(pk, **data):
        try:
            course = Course.objects.get(pk=pk, is_active=True)
        except Course.DoesNotExist:
            raise ValidationError("Course not found.")
        for attr, value in data.items():
            setattr(course, attr, value)
        course.full_clean()
        course.save()
        return course

    @staticmethod
    def delete_course(pk):
        course = Course.objects.get(pk=pk, is_active=True)
        course.is_active = False
        course.save()
        return course