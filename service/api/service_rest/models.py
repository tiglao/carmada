from django.db import models


class AutoVO(models.Model):
    import_href = models.CharField(max_length=100)
    vin = models.CharField(max_length=100)
    sold = models.BooleanField(default=False)
    color = models.CharField(max_length=100)
    year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=100)


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField()


class Appointment(models.Model):
    date_time = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    vip_status = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=100)
    reason = models.CharField(max_length=100)
    appt_status = models.PositiveSmallIntegerField()
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
