from rest_framework import serializers
from .models import Event, Invite, Loser
from users.serializers import UsersSerializer
from users.models import User
from .utils import format_datetime


class InviteSerializer(serializers.ModelSerializer):
    invitee = UsersSerializer()
    rejected_date = serializers.SerializerMethodField()
    rejected_time = serializers.SerializerMethodField()
    
    class Meta:
        model = Invite
        fields = ['invitee', 'rejected', 'rejected_date', 'rejected_time']
        
    def get_rejected_date(self, obj):
        return format_datetime(obj.rejected_at)['date']

    def get_rejected_time(self, obj):
        return format_datetime(obj.rejected_at)['time']


class EventSerializer(serializers.ModelSerializer):
    invites = InviteSerializer(many=True)
    creator = UsersSerializer()
    creation_date = serializers.SerializerMethodField()
    creation_time = serializers.SerializerMethodField()
    expiration_date = serializers.SerializerMethodField()
    expiration_time = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'invites', 'creator', 'creation_date', 'creation_time', 'expiration_date', 'expiration_time']

    def get_creation_date(self, obj):
        return format_datetime(obj.created_at)['date']

    def get_creation_time(self, obj):
        return format_datetime(obj.created_at)['time']

    def get_expiration_date(self, obj):
        return format_datetime(obj.expiration_time)['date']

    def get_expiration_time(self, obj):
        return format_datetime(obj.expiration_time)['time']

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
