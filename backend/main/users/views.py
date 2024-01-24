# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from .models import FriendRequest
from .serializers import FriendRequestSerializer
from django.contrib.auth import get_user_model


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        sender = self.request.user
        receiver_id = serializer.validated_data['receiver']

        receiver = get_object_or_404(get_user_model(), id=receiver_id)

        if receiver == sender:
            return Response({'detail': 'Cannot send friend request to yourself.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if users are already friends
        if sender.userprofile.friends.filter(id=receiver_id).exists():
            return Response({'detail': 'Users are already friends.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if there's already a pending friend request
        existing_request = FriendRequest.objects.filter(sender=sender, receiver=receiver, status='pending').first()

        if existing_request:
            return Response({'detail': 'Friend request already sent.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new friend request
        friend_request = FriendRequest.objects.create(sender=sender, receiver=receiver, status='pending')

        return Response({'detail': 'Friend request sent successfully.'}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        status_value = request.data.get('status')

        if status_value not in ['accepted', 'ignored']:
            return Response({'detail': 'Invalid status value.'}, status=status.HTTP_400_BAD_REQUEST)

        if status_value == 'accepted':
            # Update friends list for both users
            instance.sender.userprofile.friends.add(instance.receiver)
            instance.receiver.userprofile.friends.add(instance.sender)

        instance.status = status_value
        instance.save()

        return Response({'detail': 'Friend request updated successfully.'}, status=status.HTTP_200_OK)
