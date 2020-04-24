"""
ASGI config for django_server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

"""
Following a walkthrough from: 
  https://jaydenwindle.com/writing/django-websockets-zero-dependencies/
"""

import os

from django.core.asgi import get_asgi_application
from django_server.websocket import websocket_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_server.settings')

django_application = get_asgi_application()

async def application(scope, receive, send):
	if scope['type'] == 'http':
		# Django handles the HTTP requests
		await django_application(scope, receive, send)
	elif scope['type'] == 'websocket':
		# My app handles the websocket requests
		await websocket_application(scope, receive, send)
	else:
		raise NotImplementedError(f"Unknown scope type {scope['type']}")