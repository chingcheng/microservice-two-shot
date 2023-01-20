from django.urls import path
from .views import (
    list_hats,
    show_hat,
)

urlpatterns = [
    path("hats/", list_hats, name="list_hats"),
    path("hats/<int:id>/", show_hat, name="show_hat"),
]
