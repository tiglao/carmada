from django.contrib import admin

# Register your models here.
from .models import Customer, Sale, Salesperson, AutomobileVO

admin.site.register(Customer)
admin.site.register(Sale)
admin.site.register(Salesperson)
admin.site.register(AutomobileVO)
