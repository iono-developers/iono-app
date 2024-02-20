from django.urls import path
from .views import EventListCreateView, EventGetView

urlpatterns = [
    path('', EventListCreateView.as_view(), name='event-list'),
    path('<int:pk>/', EventGetView.as_view(), name='event-detail'),
]
