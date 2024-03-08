from .views import (
        AllEventsView,
        OpenEventsListView,
        PastEventsListView,
        HostEventsListView,
        EventCreateView,
        EventGetView,
        RefuseInviteView,
)

from django.urls import path


urlpatterns = [
    path('events/', AllEventsView.as_view(), name='all-events'),
    path('events/open/', OpenEventsListView.as_view(), name='open-events'),
    path('events/past/', PastEventsListView.as_view(), name='past-events'),
    #TODO i dont like this
    path('events/host/<int:creator>/', HostEventsListView.as_view(), name='host-events'),
    
    path('event/create/', EventCreateView.as_view(), name='create-event'),
    path('event/iono/', RefuseInviteView.as_view(), name='iono-event'),
    path('event/<int:pk>/', EventGetView.as_view(), name='detail-event'),
]
