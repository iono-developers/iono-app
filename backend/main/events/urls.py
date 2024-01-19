from django.urls import path
from .views import EventListCreateView, NotificationListCreateView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('notifications/', NotificationListCreateView.as_view(), name='notification-list-create'),
]
