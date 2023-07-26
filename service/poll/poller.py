import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutoVO


def get_autos():
    response = requests.get(
        "http://inventory-api:8000/api/automobiles/"
    )
    content = json.loads(response.content)
    for auto in content["autos"]:
        AutoVO.objects.update_or_create(
            vin=auto["vin"],
            defaults={
                "year": auto["year"],
                "sold": auto["sold"],
                "color": auto["color"],
                "model": auto["model"]["manufacturer"]["name"] + " " + auto["model"]["name"],
                }
        )


def poll(repeat=True):
    while True:
        print('Service poller polling for data')
        try:
            get_autos()
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
