from django.urls import path
from .views import AllEventsView, EventGetView, EventCreateView, OpenEventsListView, PastEventsListView, HostEventsListView, RefuseInviteView

urlpatterns = [
    path('all/', AllEventsView.as_view(), name='all-events'),
    path('create/', EventCreateView.as_view(), name='create-events'),
    path('open/', OpenEventsListView.as_view(), name='open-events'),
    path('past/', PastEventsListView.as_view(), name='past-events'),
    path('host/<int:creator>/', HostEventsListView.as_view(), name='host-events'),
    path('iono/', RefuseInviteView.as_view(), name='io-no'),
    path('<int:pk>/', EventGetView.as_view(), name='event-detail'),
]
