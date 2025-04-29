from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import RegisterSerializer, LoginSerializer
from core.permissions import IsAdminUser, IsTeacher, IsStudent
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user.role
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })



class AdminUserListView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        return Response({"message": "Only Admin can see this."})

class AttendanceView(APIView):
    permission_classes = [IsTeacher]
    def get(self, request):
        return Response({"message": "Only Teacher can see attendance panel."})

class StudentDashboardView(APIView):
    permission_classes = [IsStudent]
    def get(self, request):
        return Response({"message": "Student Dashboard Access Granted."})
