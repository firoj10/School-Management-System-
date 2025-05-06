from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from .models import Course
from .serializers import CourseSerializer
from .services import CourseService

class CourseListCreateAPI(APIView):
    def get(self, request):
        courses = Course.objects.filter(is_active=True)
        serializer = CourseSerializer(courses, many=True)
        return Response({
            'message': 'Active courses retrieved successfully.',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            try:
                course = CourseService.create_course(**serializer.validated_data)   

                return Response({
                    'message': 'Course created successfully.',
                    'data': CourseSerializer(course).data
                }, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                return Response({
                    'message': 'Course creation failed.',
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'message': 'Invalid course data.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class CourseRetrieveUpdateDestroyAPI(APIView):
    def get_object(self, pk):
        return Course.objects.get(pk=pk, is_active=True)

    def get(self, request, pk):
        try:
            course = self.get_object(pk)
            serializer = CourseSerializer(course)
            return Response({
                'message': 'Course retrieved successfully.',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response({'message': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            course = self.get_object(pk)
            serializer = CourseSerializer(course, data=request.data, partial=True)
            if serializer.is_valid():
                updated = CourseService.update_course(pk, **serializer.validated_data)
                return Response({
                    'message': 'Course updated successfully.',
                    'data': CourseSerializer(updated).data
                }, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid data.', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Course.DoesNotExist:
            return Response({'message': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response({'message': 'Course update failed.', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            CourseService.delete_course(pk)
            return Response({'message': 'Course deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Course.DoesNotExist:
            return Response({'message': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)