from django.urls import path
from .views import EventListCreateView, InviteListCreateView, LoserListCreateView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('invites/', InviteListCreateView.as_view(), name='invite-list-create'),
    path('loser/', LoserListCreateView.as_view(), name='loser-list-create'),
]
