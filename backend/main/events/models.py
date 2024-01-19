from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    photo = models.ImageField(upload_to='event_photos/', null=True, blank=True)
    timer = models.DateTimeField()
    invited_friends = models.ManyToManyField(User, related_name='invited_friends', blank=True)
    responded_friends = models.ManyToManyField(User, related_name='responded_friends', blank=True)
    winner = models.ForeignKey(User, related_name='winner', null=True, blank=True, on_delete=models.CASCADE)

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
