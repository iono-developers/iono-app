from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    description = models.TextField(blank=True)
    emoji = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return self.username