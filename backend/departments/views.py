# department/views.py  
from rest_framework import viewsets, permissions  
from .models import Department  
from .serializers import DepartmentSerializer  

class DepartmentViewSet(viewsets.ModelViewSet):  
    queryset = Department.objects.all()  
    serializer_class = DepartmentSerializer  
    permission_classes = [permissions.IsAdminUser]  # শুধু অ্যাডমিন CRUD পারবে  

    # Custom Queryset Filtering (Optional)  
    def get_queryset(self):  
        return Department.objects.filter(name__icontains=self.request.query_params.get('search', ''))  