from django.urls import path
from .views import (
    list_hats,
)

urlpatterns = [
    path("hats/", list_hats, name="list_hats"),
]
