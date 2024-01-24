from rest_framework import serializers
from .models import Event, Invite, Loser


class EventSerializer(serializers.ModelSerializer):
    creator_username = serializers.ReadOnlyField(source='creator.username')
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    expiration_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = Event
        fields = '__all__'

class InviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invite
        fields = '__all__'

class LoserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loser
        fields = '__all__'