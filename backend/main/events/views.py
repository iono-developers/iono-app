from rest_framework import generics, views 
from .models import Event, Invite, Loser
from .serializers import EventSerializer, InviteSerializer, LoserSerializer, EventCreateSerializer, RefuseInviteSerializer
from django.utils import timezone
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404



class EventCreateView(generics.CreateAPIView):
    # queryset = Event.objects.all()
    serializer_class = EventCreateSerializer


class AllEventsView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Event.objects.all().order_by('-created_at')


class OpenEventsListView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Event.objects.filter(expired_at__gt=timezone.now()).order_by('expired_at')
    

class PastEventsListView(generics.ListAPIView):
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Event.objects.filter(expired_at__lte=timezone.now()).order_by('-expired_at')


class HostEventsListView(generics.ListAPIView):
    serializer_class = EventSerializer
    lookup_field = 'creator'
    
    def get_queryset(self):
        user_id = self.kwargs['creator']  # Assuming you pass the user's ID in the URL
        return Event.objects.filter(creator__id=user_id)

class EventGetView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class RefuseInviteView(views.APIView):
    def post(self, request):
        event_id = request.data.get('event')
        invitee_id = request.data.get('invitee')
        invite = get_object_or_404(Invite, event__id=event_id, invitee__id=invitee_id)
        serializer = RefuseInviteSerializer(instance=invite, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InviteListCreateView(generics.ListCreateAPIView):
    queryset = Invite.objects.all()
    serializer_class = InviteSerializer
  
class LoserListCreateView(generics.ListCreateAPIView):
    queryset = Loser.objects.all()
    serializer_class = LoserSerializer

