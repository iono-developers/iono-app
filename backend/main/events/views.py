from rest_framework import generics
from .models import Event, Invite, Loser
from .serializers import EventSerializer, InviteSerializer, LoserSerializer, EventCreateSerializer
from django.shortcuts import get_object_or_404


class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EventCreateSerializer
        return EventSerializer

class InviteListCreateView(generics.ListCreateAPIView):
    queryset = Invite.objects.all()
    serializer_class = InviteSerializer
    
class LoserListCreateView(generics.ListCreateAPIView):
    queryset = Loser.objects.all()
    serializer_class = LoserSerializer

class EventGetView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
