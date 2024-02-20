from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Event(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos/', blank=True)
    expiration_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

class Invite(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='invites')
    invitee = models.ForeignKey(User, on_delete=models.CASCADE)
    rejected = models.BooleanField(default=False)
    rejected_at = models.DateTimeField(blank=True)

class Loser(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE)
    selected_user = models.ForeignKey(User, on_delete=models.CASCADE)
    selected_at = models.DateTimeField(auto_now_add=True)
