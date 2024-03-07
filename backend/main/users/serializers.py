# serializers.py

from rest_framework import serializers
from .models import FriendRequest
from django.contrib.auth import get_user_model

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username']
        
class ProfileUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'emoji', 'description']

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = '__all__'
