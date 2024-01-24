from django.contrib import admin
from .models import Event, Invite, Loser


class InviteInline(admin.TabularInline):  # You can also use admin.StackedInline for a different display style
    model = Invite
    extra = 1  # Number of empty forms to display

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'creator', 'expiration_time', 'created_at')
    search_fields = ('title', 'creator__username')
    inlines = [InviteInline]

@admin.register(Invite)
class InviteAdmin(admin.ModelAdmin):
    list_display = ('event', 'invitee', 'rejected', 'rejected_at')
    search_fields = ('event__title', 'invitee__username')

@admin.register(Loser)
class LoserAdmin(admin.ModelAdmin):
    list_display = ('event', 'selected_user', 'selected_at')
    search_fields = ('event__title', 'selected_user__username')
