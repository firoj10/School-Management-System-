# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Department
# from .serializers import DepartmentSerializer
# from django.shortcuts import get_object_or_404

# class DepartmentListCreateAPI(APIView):
#     def get(self, request):
#         departments = Department.objects.filter(is_active=True)
#         serializer = DepartmentSerializer(departments, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = DepartmentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DepartmentRetrieveUpdateDestroyAPI(APIView):
#     def get_object(self, pk):
#         return get_object_or_404(Department, pk=pk)

#     def get(self, request, pk):
#         department = self.get_object(pk)
#         serializer = DepartmentSerializer(department)
#         return Response(serializer.data)

#     def patch(self, request, pk):
#         department = self.get_object(pk)
#         serializer = DepartmentSerializer(department, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         department = self.get_object(pk)
#         department.is_active = False
#         department.save()
#         return Response(status=status.HTTP_204_NO_CONTENT)
from django.core.exceptions import ValidationError  # Add this import

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import DepartmentService
from .serializers import DepartmentSerializer
from .models import Department

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Department
# from .serializers import DepartmentSerializer
# from django.shortcuts import get_object_or_404

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