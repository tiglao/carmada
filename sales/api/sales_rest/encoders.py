from common.json import ModelEncoder

from .models import Sale, Customer, Salesperson, AutomobileVO

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "salesperson",
        "customer",
        "automobile"
    ]

    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileEncoder()
    }
