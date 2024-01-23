from django.urls import path
from .views import EventListCreateView, InviteListCreateView, LoserListCreateView, EventGetView

urlpatterns = [
    path('', EventListCreateView.as_view(), name='event-list-create'),
    path('<int:pk>/', EventGetView.as_view(), name='event-get'),
    path('invites/', InviteListCreateView.as_view(), name='invite-list-create'),
    path('loser/', LoserListCreateView.as_view(), name='loser-list-create'),
]
