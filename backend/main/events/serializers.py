from rest_framework import serializers
from .models import Event, Invite, Loser
from users.serializers import UsersSerializer
from users.models import User

class InviteSerializer(serializers.ModelSerializer):
    invitee = UsersSerializer()
    
    class Meta:
        model = Invite
        fields = ['invitee', 'rejected']

class EventSerializer(serializers.ModelSerializer):
    invites = InviteSerializer(many=True)
    creator = UsersSerializer()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'expiration_time', 'invites', 'creator', 'created_at']

class EventCreateSerializer(serializers.ModelSerializer):
    invites = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    creator = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Event
        fields = ['title', 'description', 'expiration_time', 'invites', 'creator']
    
    def create(self, validated_data):
        invites_data = validated_data.pop('invites')
        event = Event.objects.create(**validated_data)
        for invitee in invites_data:
            Invite.objects.create(event=event, invitee=invitee)
        return event

class LoserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loser
        fields = '__all__'
