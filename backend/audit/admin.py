from django.contrib import admin
from .models import AuditLog

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'user', 'action', 'content_object')
    list_filter = ('action', 'content_type')
    search_fields = ('user__username', 'ip_address')
    readonly_fields = ('content_object', 'details')
    date_hierarchy = 'timestamp'

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False