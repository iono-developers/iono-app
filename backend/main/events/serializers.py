from .models import Event, Invite, Loser
from .utils import format_date, format_time, format_how_long_ago
from .mail.mail import send
from users.serializers import UsersSerializer
from users.models import User

from datetime import datetime
from rest_framework import serializers


class InviteSerializer(serializers.ModelSerializer):
    invitee = UsersSerializer()
    rejected_date = serializers.SerializerMethodField()
    rejected_time = serializers.SerializerMethodField()
    
    class Meta:
        model = Invite
        fields = ['invitee', 'rejected', 'rejected_date', 'rejected_time']
        
    def get_rejected_date(self, obj):
        return format_date(obj.rejected_at, format_type='short')

    def get_rejected_time(self, obj):
        return format_time(obj.rejected_at)

class RefuseInviteSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    invitee = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Invite
        fields = ['event', 'invitee']

    def update(self, instance, validated_data):
        instance.rejected = True
        instance.rejected_at = datetime.now()
        instance.save()
        return instance

class EventSerializer(serializers.ModelSerializer):
    invites = InviteSerializer(many=True)
    creator = UsersSerializer()
    creation_date = serializers.SerializerMethodField()
    creation_time = serializers.SerializerMethodField()
    creation_ago = serializers.SerializerMethodField()
    expiration_date = serializers.SerializerMethodField()
    expiration_time = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'invites',
                  'creator', 'creation_date', 'creation_time',
                  'creation_ago', 'expiration_date',
                  'expiration_time']

    def get_creation_ago(self, obj):
        return format_how_long_ago(obj.created_at)
    
    def get_creation_time(self, obj):
        return format_time(obj.created_at)
    
    def get_creation_date(self, obj):
        return format_date(obj.created_at)

    def get_expiration_date(self, obj):
        return format_date(obj.expired_at)

    def get_expiration_time(self, obj):
        return format_time(obj.expired_at)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['invites'] = sorted(data['invites'], key=lambda invite: (not invite['rejected'], invite['rejected_time'] or '9999-99-99 99:99'))
        return data

class EventCreateSerializer(serializers.ModelSerializer):
    invites = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    creator = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = Event
        fields = ['title', 'description', 'expired_at', 'invites', 'creator']
    
    def create(self, validated_data):
        invites_data = validated_data.pop('invites')
        event = Event.objects.create(**validated_data)
        for invitee in invites_data:
            Invite.objects.create(event=event, invitee=invitee)
        
        # TODO: ugly af, dont do this in serializer!!!
        
        # Construct the URL for the event and send email to invitees
        event_url = f"{self.context['request'].META['HTTP_HOST'].split(':')}/events/{event.id}"
        send(f'{event.creator.username} ti ha sfidato!',
             f'Per rispondere vai qui {event_url}',
             [invitee.email for invitee in invites_data])
        
        return event

class LoserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loser
        fields = '__all__'