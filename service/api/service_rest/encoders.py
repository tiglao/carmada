from common.json import ModelEncoder

from .models import Technician, AutoVO, Appointment


class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties = [
        "vin",
        "sold"
        ]


class TechEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class ApptListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "technician",
    ]
    encoders = {
        "technician": TechEncoder(),
    }


class ApptDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "technician",
        "customer",
        "vip_status",
        "vin",
        "reason",
        "appt_status"
    ]
    encoders = {
        "technician": TechEncoder(),
    }
