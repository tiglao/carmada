from django.urls import path

from .views import api_poll_autos, api_list_techs, api_list_appts, api_detail_tech, api_detail_appt


urlpatterns = [
  path("autosvo/", api_poll_autos, name="api_poll_autos"),
  path("technicians/", api_list_techs, name="api_list_techs"),
  path("technicians/<int:id>/", api_detail_tech, name="api_detail_tech"),
  path("appointments/", api_list_appts, name="api_list_appts"),
  path("appointments/<int:id>/", api_detail_appt, name="api_detail_appt"),
  path(
      'appointments/<int:id>/<str:action>',
      api_detail_appt,
      name='appt_detail_action'),

]
