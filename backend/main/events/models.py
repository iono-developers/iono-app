from users.models import User

from django.db import models


class Event(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos/', blank=True)
    expired_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

class Invite(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='invites')
    invitee = models.ForeignKey(User, on_delete=models.CASCADE)
    rejected = models.BooleanField(default=False)
    rejected_at = models.DateTimeField(null=True)

class Loser(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE)
    selected_user = models.ForeignKey(User, on_delete=models.CASCADE)
    selected_at = models.DateTimeField(auto_now_add=True)
