from django.contrib import admin
from django.urls import path
from .views import test_api

urlpatterns = [
    path('', test_api),
]
