import threading

local = threading.local()

class RequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        local.request = request
        try:
            response = self.get_response(request)
        finally:
            if hasattr(local, 'request'):
                del local.request
        return response

def get_current_request():
    return getattr(local, 'request', None)




