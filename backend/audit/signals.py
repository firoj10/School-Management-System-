from django.contrib.contenttypes.models import ContentType
from .models import AuditLog
from .middleware import get_current_request
from .utils import serialize_instance

def audit_log(action, instance):
    request = get_current_request()
    user = None
    
    if request and hasattr(request, 'user') and request.user.is_authenticated:
        user = request.user

    try:
        content_type = ContentType.objects.get_for_model(instance)
        AuditLog.objects.create(
            user=user,
            action=action,
            content_type=content_type,
            object_id=instance.pk,
            ip_address=request.META.get('REMOTE_ADDR') if request else None,
            details={
                'model': f"{content_type.app_label}.{content_type.model}",
                'data': serialize_instance(instance)
            }
        )
    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Audit log failed: {str(e)}")