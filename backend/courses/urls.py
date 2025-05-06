from django.urls import path
from .views import CourseListCreateAPI, CourseRetrieveUpdateDestroyAPI

urlpatterns = [
    path('courses/', CourseListCreateAPI.as_view(), name='course-list'),
    path('courses/<int:pk>/', CourseRetrieveUpdateDestroyAPI.as_view(), name='course-detail'),
]