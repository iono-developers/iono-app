from rest_framework import generics
from .models import Event, Invite, Loser
from .serializers import EventSerializer, InviteSerializer, LoserSerializer


class EventGetView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class InviteListCreateView(generics.ListCreateAPIView):
    queryset = Invite.objects.all()
    serializer_class = InviteSerializer
    
class LoserListCreateView(generics.ListCreateAPIView):
    queryset = Loser.objects.all()
    serializer_class = LoserSerializer
