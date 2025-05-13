from rest_framework import viewsets
from .models import AuditLog
from audit.serializers import AuditLogSerializer

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    filterset_fields = ['action', 'content_type', 'user']
    ordering_fields = ['timestamp']