from django.urls import path
from .views import (
    TeacherCreateView,
    TeacherListView,
    TeacherDetailView,
    TeacherUpdateView,
    TeacherDeleteView,
)

app_name = "teachers"

urlpatterns = [
    path('teachers/', TeacherListView.as_view(), name='list'),                       
    path('teachers/create/', TeacherCreateView.as_view(), name='create'),            
    path('teachers/detail/<int:pk>/', TeacherDetailView.as_view(), name='detail'),       
    path('teachers/update/<int:pk>/', TeacherUpdateView.as_view(), name='update'),   
    path('teachers/delete/<int:pk>/', TeacherDeleteView.as_view(), name='delete'),    
]
