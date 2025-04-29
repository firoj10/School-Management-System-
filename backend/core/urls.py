from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import RegisterView, LoginView
from .views import AdminUserListView, AttendanceView, StudentDashboardView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),  # Optional (custom login)
    
    # ✅ JWT Token Handling
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    
    path('admin/users/', AdminUserListView.as_view()),
    path('teacher/attendance/', AttendanceView.as_view()),
    path('student/dashboard/', StudentDashboardView.as_view()),
]
