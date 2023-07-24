from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from common.json import ModelEncoder
from .models import AutoVO


class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties = [
        "vin",
        "color",
        "year",
        "model_name"
        ]


@require_http_methods(["GET", "POST"])
def api_poll_autos(request):
    if request.method == "GET":
        autos = AutoVO.objects.all()
        print("these are autos:", autos)
        return JsonResponse(
            {"autos": autos},
            encoder=AutoVOEncoder,
        )
