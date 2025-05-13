from django.forms.models import model_to_dict
from django.core.exceptions import FieldDoesNotExist
import datetime

def serialize_instance(instance):
    """Robust model instance serialization"""
    try:
        return model_to_dict(instance)
    except Exception as e:
        data = {}
        for field in instance._meta.fields:
            try:
                value = getattr(instance, field.name)
                if isinstance(value, (datetime.date, datetime.datetime)):
                    data[field.name] = value.isoformat()
                elif hasattr(value, 'pk'):
                    data[field.name] = value.pk
                else:
                    data[field.name] = str(value)
            except FieldDoesNotExist:
                continue
        return data