import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .encoders import (
    TechEncoder,
    AutoVOEncoder,
    ApptListEncoder,
    ApptDetailEncoder
)
from .models import AutoVO, Technician, Appointment


@require_http_methods(["GET", "POST"])
def api_poll_autos(request):
    if request.method == "GET":
        autos = AutoVO.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutoVOEncoder,
        )


@require_http_methods(["GET", "POST"])
def api_list_techs(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": list(technicians)},
                encoder=TechEncoder,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "There are no technicians in the database, or they are not available."})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            tech = Technician.objects.create(**content)
            return JsonResponse(
                tech,
                encoder=TechEncoder,
                safe=False,
            )
        except (json.JSONDecodeError, TypeError):
            response = JsonResponse({"message": "The provided JSON body could not be decoded or is not the correct format."})
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST", "DELETE"])
def api_detail_tech(request, id):
    if request.method == "GET":
        try:
            tech = Technician.objects.get(id=id)
            return JsonResponse(
                tech,
                encoder=TechEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No technician with this ID found."},
                status=404)
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(id=id).delete()
            return JsonResponse({"Deletion complete:": count > 0})
        except Exception as e:
            return JsonResponse({"message": f"An unexpected error occurred: {str(e)}"})

    # else: # PUT
    #     try:
    #         content = json.loads(request.body)
    #         tech = Technician.objects.get(id=pk)

    #         props = ["closet_name", "shelf_number", "section_number"]
    #         for prop in props:
    #             if prop in content:
    #                 setattr(tech, prop, content[prop])
    #         tech.save()
    #         return JsonResponse(
    #             tech,
    #             encoder=technicianEncoder,
    #             safe=False,
    #         )
    #     except Technician.DoesNotExist:
    #         response = JsonResponse({"message": "Does not exist"})
    #         response.status_code = 404
    #         return response


def serialize_appointment(appt):
    return {
        "id": appt.id,
        "date_time": appt.date_time,
        "customer": appt.customer,
        "vip_status": appt.vip_status,
        "vin": appt.vin,
        "reason": appt.reason,
        "appt_status": appt.appt_status,
        "technician": {
            "first_name": appt.technician.first_name,
            "last_name": appt.technician.last_name,
            "employee_id": appt.technician.employee_id
        }
    }


def api_list_appts(request):
    if request.method == "GET":
        try:
            appts = Appointment.objects.all()
            appts_serialized = [serialize_appointment(appt) for appt in appts]
            return JsonResponse(
                {"appts": appts_serialized},
                encoder=ApptListEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "There are no appointments in the database, or they are not available."})
            response.status_code = 404
            return response
    else:
        try:
            content = json.loads(request.body)
            appt = Appointment.objects.create(**content)
            return JsonResponse(
                appt,
                encoder=ApptListEncoder,
                safe=False,
            )
        except (json.JSONDecodeError, TypeError):
            response = JsonResponse({"message": "The provided JSON body could not be decoded or is not the correct format."})
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_detail_appt(request, id, action=None):
    if request.method == "GET":
        try:
            appt = Appointment.objects.get(id=id)
            return JsonResponse(
                appt,
                encoder=ApptDetailEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "No appointment with this ID found."},
                status=404)
    elif request.method == "DELETE":
        try:
            count, _ = Appointment.objects.filter(id=id).delete()
            return JsonResponse({"Deletion complete:": count > 0})
        except Exception as e:
            return JsonResponse({"message": f"An unexpected error occurred: {str(e)}"})

    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                tech = Technician.objects.get(id=content["technician"])
                content["technician"] = tech
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No technician in database with this ID."},
                status=400,
            )
        Appointment.objects.filter(id=id).update(**content)
        appt = Appointment.objects.get(id=id)
        if action is None:
            pass
        elif action == "cancel":
            appt.appt_status = "canceled"
        elif action == "finish":
            appt.appt_status = "finished"
        else:
            return JsonResponse(
                {"message": "Invalid action for PUT request."},
                status=400)
        appt.save()
        return JsonResponse(
            appt,
            encoder=ApptDetailEncoder,
            safe=False,
        )
