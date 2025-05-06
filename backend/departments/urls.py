
from django.urls import path
from .views import DepartmentListCreateAPI, DepartmentRetrieveUpdateDestroyAPI,SubjectListCreateAPI,SubjectRetrieveUpdateDestroyAPI

app_name = 'departments'

urlpatterns = [
    path('departments/', DepartmentListCreateAPI.as_view(), name='department-list'),
    path('departments/<int:pk>/', DepartmentRetrieveUpdateDestroyAPI.as_view(), name='department-detail'),
    
   path('subjects/', SubjectListCreateAPI.as_view(), name='subject-list'),
    path('subjects/<int:pk>/', SubjectRetrieveUpdateDestroyAPI.as_view(), name='subject-detail')
]