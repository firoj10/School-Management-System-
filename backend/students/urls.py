
from django.urls import path
from students.views import (
  StudentApplicationApproveView,StudentApplicationRejectView,NonApprovedStudentApplicationListView
  ,StudentApplicationCreateView,PendingStudentApplicationListView,ApprovedStudentApplicationListView
  ,RejectedStudentApplicationListView
)


urlpatterns = [

    # Application approval flow
    path('student/application/', StudentApplicationCreateView.as_view(), name='student-application-create'),
    path('student/application/pending/', PendingStudentApplicationListView.as_view(), name='student-application-pending'),
    path('student/application/approved/', ApprovedStudentApplicationListView.as_view(), name='student-application-approved'),
    path('student/application/rejected/', RejectedStudentApplicationListView.as_view(), name='student-application-rejected'),
    path('student/application/non-approved/', NonApprovedStudentApplicationListView.as_view(), name='student-application-non-approved'),

        

    path('student/applications/approve/<uuid:pk>/', StudentApplicationApproveView.as_view(), name='approve-application'),
    path('student/applications/reject/<uuid:pk>/', StudentApplicationRejectView.as_view(), name='reject-application'),
]

