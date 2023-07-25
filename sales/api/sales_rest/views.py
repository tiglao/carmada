from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Sale, Salesperson, AutomobileVO, Customer
from .encoders import SalesEncoder, SalespersonEncoder, AutomobileEncoder, CustomerEncoder


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            payload = {}
            #get the salesperson id
            payload["salesperson"] = Salesperson.objects.get(employee_id = content["employee_id"])
            print(payload["salesperson"])
            print("-----------------------------------")

            # get the phone number
            payload["customer"] = Customer.objects.get(phone_number = content["phone_number"])
            print(payload["customer"])
            print("-----------------------------------")

            # get the vin
            payload["automobile"] = AutomobileVO.objects.get(vin=content["vin"])
            print(payload["automobile"])
            print("-----------------------------------")
            payload["price"] = content["price"]

            print(payload)
            print("-----------------------------------")

            sale = Sale.objects.create(**payload)
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sale"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale(request, vin):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(id=id)

            props = ["automobile", "customer", "salesperson", "price"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.get(id=id)

            props = ["first_name", "last_name", "employee_id", "id"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, phone_number):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(phone_number=phone_number)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(phone_number=phone_number)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(phone_number=phone_number)

            props = ["first_name", "last_name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
