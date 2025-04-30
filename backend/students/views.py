from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Student
from .serializers import StudentSerializer
from core.permissions import IsAdminUser
# from students.services import StudentApplicationService

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# from students.services import StudentApplicationService
from students.models import StudentApplication
from students.services import StudentApplicationService
from students.serializers import StudentApplicationSerializer


class StudentApplicationCreateView(generics.CreateAPIView):
    queryset = StudentApplication.objects.all()
    serializer_class = StudentApplicationSerializer
    # Public access: No authentication required
    permission_classes = []  # No permissions, so public access
    
    
class PendingStudentApplicationListView(generics.ListAPIView):
    serializer_class = StudentApplicationSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return StudentApplication.objects.filter(status='pending')


class ApprovedStudentApplicationListView(generics.ListAPIView):
    serializer_class = StudentApplicationSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return StudentApplication.objects.filter(status='approved')


class NonApprovedStudentApplicationListView(generics.ListAPIView):
    serializer_class = StudentApplicationSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return StudentApplication.objects.exclude(status='approved')\
            .select_related('student', 'student__user')


class RejectedStudentApplicationListView(generics.ListAPIView):
    serializer_class = StudentApplicationSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_queryset(self):
        return StudentApplication.objects.filter(status='rejected')


class StudentApplicationApproveView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]  # Only admin can approve

    def post(self, request, pk):
        try:
            StudentApplicationService.approve(pk)
            return Response({"message": "Application approved successfully!"}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class StudentApplicationRejectView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]  # Only admin can reject

    def post(self, request, pk):
        try:
            StudentApplicationService.reject(pk)
            return Response({"message": "Application rejected successfully!"}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
