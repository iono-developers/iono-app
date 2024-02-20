# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FriendRequestViewSet, UsersViewSet

router = DefaultRouter()
router.register(r'friend', FriendRequestViewSet, basename='friend')
router.register(r'users', UsersViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls))
]
