from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .signals import audit_log

class AuditModelRegistry:
    _registry = []

    @classmethod
    def register(cls, model):
        if model not in cls._registry:
            cls._registry.append(model)
            cls._connect_signals(model)

    @classmethod
    def _connect_signals(cls, model):
        @receiver(post_save, sender=model)
        def post_save_handler(sender, instance, created, **kwargs):
            action = 'C' if created else 'U'
            audit_log(action, instance)

        @receiver(post_delete, sender=model)
        def post_delete_handler(sender, instance, **kwargs):
            audit_log('D', instance)