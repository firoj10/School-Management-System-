# from django.urls import path
# from .views import DepartmentListCreateAPI, DepartmentRetrieveUpdateDestroyAPI

# app_name = 'departments'  

# urlpatterns = [
#     path('departments/', DepartmentListCreateAPI.as_view(), name='department-list'),
#     path('departments/<int:pk>/', DepartmentRetrieveUpdateDestroyAPI.as_view(), name='department-detail'),
# ]
from django.urls import path
from .views import DepartmentListCreateAPI, DepartmentRetrieveUpdateDestroyAPI

app_name = 'departments'

urlpatterns = [
    path('departments/', DepartmentListCreateAPI.as_view(), name='department-list'),
    path('departments/<int:pk>/', DepartmentRetrieveUpdateDestroyAPI.as_view(), name='department-detail'),
]