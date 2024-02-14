from rest_framework import serializers
from .models import Event, Invite, Loser


class InviteSerializer(serializers.ModelSerializer):
    rejected_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    invitee_username = serializers.ReadOnlyField(source='invitee.username')
    class Meta:
        model = Invite
        fields = '__all__'

class LoserSerializer(serializers.ModelSerializer):
    loser_username = serializers.ReadOnlyField(source='loser.username')
    class Meta:
        model = Loser
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    creator_username = serializers.ReadOnlyField(source='creator.username')
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    expiration_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    invites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    loser = LoserSerializer(read_only=True)
    invites = InviteSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = '__all__'
    
    #VERY UGLY: fix this
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['invites'] = InviteSerializer(instance.invite_set.all(), many=True).data
        return representation