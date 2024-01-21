# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendRequestViewSet

router = DefaultRouter()
router.register(r'friend', FriendRequestViewSet, basename='friend')

urlpatterns = [
    path('', include(router.urls)),
]
