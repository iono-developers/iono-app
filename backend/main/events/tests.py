from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Event, Invite, Loser

# Test cases for the Event model
class EventModelTest(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpass')
        # Create a test event
        self.event = Event.objects.create(
            creator=self.user,
            title='Test Event',
            description='Test Event Description',
            expiration_time=timezone.now(),
        )

    def test_event_creation(self):
        # Test that the event is created successfully
        self.assertEqual(Event.objects.count(), 1)
        self.assertEqual(Event.objects.get().title, 'Test Event')
        self.assertEqual(Event.objects.get().creator, self.user)

# Test cases for the Invite model
class InviteModelTest(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpass')
        # Create a test event
        self.event = Event.objects.create(
            creator=self.user,
            title='Test Event',
            description='Test Event Description',
            expiration_time=timezone.now(),
        )
        # Create a test invitee user
        self.invitee = User.objects.create_user(username='inviteeuser', password='testpass')
        # Create a test invite
        self.invite = Invite.objects.create(event=self.event, invitee=self.invitee)

    def test_invite_creation(self):
        # Test that the invite is created successfully
        self.assertEqual(Invite.objects.count(), 1)
        self.assertEqual(Invite.objects.get().event, self.event)
        self.assertEqual(Invite.objects.get().invitee, self.invitee)

    def test_invite_rejection(self):
        # Test that an invite can be rejected
        invite = Invite.objects.get()
        invite.rejected = True
        invite.rejected_at = timezone.now()
        invite.save()

        self.assertTrue(Invite.objects.get().rejected)
        self.assertIsNotNone(Invite.objects.get().rejected_at)

# Test cases for the Loser model
class LoserModelTest(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='testpass')
        # Create a test event
        self.event = Event.objects.create(
            creator=self.user,
            title='Test Event',
            description='Test Event Description',
            expiration_time=timezone.now(),
        )
        # Create a test loser
        self.loser = Loser.objects.create(event=self.event, selected_user=self.user)

    def test_loser_creation(self):
        # Test that the loser is created successfully
        self.assertEqual(Loser.objects.count(), 1)
        self.assertEqual(Loser.objects.get().event, self.event)
        self.assertEqual(Loser.objects.get().selected_user, self.user)
