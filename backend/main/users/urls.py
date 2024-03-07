from django.urls import path
from .views import UsersViewSet, change_emoji

urlpatterns = [
    path('users/', UsersViewSet.as_view({'get': 'list'})),
    path('user/<str:pk>/', UsersViewSet.as_view({'get': 'retrieve'})),
    path('users/change-emoji/', change_emoji, name='change_emoji'),
]