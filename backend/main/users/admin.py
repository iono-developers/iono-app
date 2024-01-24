# admin.py

from django.contrib import admin
from .models import FriendRequest


class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('sender__username', 'receiver__username')
    date_hierarchy = 'created_at'

admin.site.register(FriendRequest, FriendRequestAdmin)
