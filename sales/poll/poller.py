import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

def get_automobile():
    url = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(url.content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin=automobile["vin"],
            sold=automobile["sold"],
            defaults={"vin": automobile["vin"]}
        )

def poll(repeat=True):
    while True:
        print('Sales poller polling for data!')
        try:
            get_automobile()
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
