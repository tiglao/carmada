from django.urls import path

from .views import api_poll_autos


urlpatterns = [
  path("autosvo/", api_poll_autos, name="api_poll_autos"),
]
