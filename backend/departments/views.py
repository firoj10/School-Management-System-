
from django.core.exceptions import ValidationError  
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import DepartmentService,SubjectService
from .serializers import DepartmentSerializer,SubjectSerializer
from .models import Department,Subject

class DepartmentListCreateAPI(APIView):
    """
    API endpoint for listing and creating departments
    """
    
    def get(self, request):
        """List all active departments"""
        departments = DepartmentService.get_active_departments()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create a new department"""
        try:
            department = DepartmentService.create_department(
                code=request.data.get('code'),
                name=request.data.get('name'),
                description=request.data.get('description')
            )
            serializer = DepartmentSerializer(department)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DepartmentRetrieveUpdateDestroyAPI(APIView):
    """
    API endpoint for retrieving, updating and deleting departments
    """
    
    def get(self, request, pk):
        """Retrieve a single department"""
        try:
            department = DepartmentService.get_department_by_id(pk)
            serializer = DepartmentSerializer(department)
            return Response(serializer.data)
        except Department.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        """Update a department"""
        try:
            department = DepartmentService.update_department(pk, **request.data)
            serializer = DepartmentSerializer(department)
            return Response(serializer.data)
        except (ValidationError, Department.DoesNotExist) as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Deactivate a department"""
        try:
            DepartmentService.deactivate_department(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Department.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
class SubjectListCreateAPI(APIView):
    def get(self, request):
        subjects = Subject.objects.filter(is_active=True)
        serializer = SubjectSerializer(subjects, many=True)
        return Response({
            'message': 'Active subjects retrieved successfully.',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            try:
                subject = SubjectService.create_subject(**serializer.validated_data)
                return Response({
                    'message': 'Subject created successfully.',
                    'data': SubjectSerializer(subject).data
                }, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                return Response({
                    'message': 'Subject creation failed.',
                    'error': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'message': 'Invalid subject data.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class SubjectRetrieveUpdateDestroyAPI(APIView):
    def get_object(self, pk):
        return Subject.objects.get(pk=pk, is_active=True)

    def get(self, request, pk):
        try:
            subject = self.get_object(pk)
            serializer = SubjectSerializer(subject)
            return Response({
                'message': 'Subject retrieved successfully.',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        except Subject.DoesNotExist:
            return Response({
                'message': 'Subject not found.'
            }, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            subject = self.get_object(pk)
            serializer = SubjectSerializer(subject, data=request.data)
            if serializer.is_valid():
                updated_subject = SubjectService.update_subject(pk, **serializer.validated_data)
                return Response({
                    'message': 'Subject updated successfully.',
                    'data': SubjectSerializer(updated_subject).data
                }, status=status.HTTP_200_OK)
            return Response({
                'message': 'Invalid subject data.',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Subject.DoesNotExist:
            return Response({
                'message': 'Subject not found.'
            }, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response({
                'message': 'Subject update failed.',
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            SubjectService.delete_subject(pk)
            return Response({
                'message': 'Subject deleted successfully.'
            }, status=status.HTTP_204_NO_CONTENT)
        except Subject.DoesNotExist:
            return Response({
                'message': 'Subject not found.'
            }, status=status.HTTP_404_NOT_FOUND)
