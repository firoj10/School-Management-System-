from django.contrib import admin
from students.models import StudentApplication
from students.services import StudentApplicationService

class StudentApplicationAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'status', 'applied_at']
    list_filter = ['status']
    actions = ['approve_application', 'reject_application']

    def approve_application(self, request, queryset):
        for application in queryset.filter(status='pending'):
            try:
                StudentApplicationService.approve(application.id)
            except ValueError as e:
                self.message_user(request, f"Error: {str(e)}", level='error')
            else:
                self.message_user(request, f"Application {application.id} approved successfully.")
    
    def reject_application(self, request, queryset):
        for application in queryset.filter(status='pending'):
            try:
                StudentApplicationService.reject(application.id)
            except ValueError as e:
                self.message_user(request, f"Error: {str(e)}", level='error')
            else:
                self.message_user(request, f"Application {application.id} rejected successfully.")

    approve_application.short_description = "Approve selected applications"
    reject_application.short_description = "Reject selected applications"

admin.site.register(StudentApplication, StudentApplicationAdmin)
