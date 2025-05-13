from rest_framework import serializers
from .models import AuditLog

class AuditLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    content_object = serializers.SerializerMethodField()
    action = serializers.CharField(source='get_action_display')

    class Meta:
        model = AuditLog
        fields = '__all__'

    def get_content_object(self, obj):
        if obj.content_object:
            return str(obj.content_object)
        return None