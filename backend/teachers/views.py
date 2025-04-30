from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from teachers.models import Teacher
from teachers.serializers import TeacherCreateSerializer
from teachers.services import TeacherService

class TeacherListView(generics.ListAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherCreateSerializer


class TeacherDetailView(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherCreateSerializer
    lookup_field = 'pk'


class TeacherCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = TeacherCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                TeacherService.create_teacher(serializer.validated_data)
                return Response({"detail": "Teacher created and email sent."}, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, pk):
        teacher = get_object_or_404(Teacher, pk=pk)
        serializer = TeacherCreateSerializer(teacher, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Teacher updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherDeleteView(APIView):
    def delete(self, request, pk):
        teacher = get_object_or_404(Teacher, pk=pk)
        user = teacher.user
        teacher.delete()
        user.delete()
        return Response({"detail": "Teacher and linked user deleted."}, status=status.HTTP_204_NO_CONTENT)
