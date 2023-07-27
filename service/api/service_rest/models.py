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
    employee_id = models.CharField(max_length=100)


class Appointment(models.Model):
    appt_status_choices = [
        ("created", "created"),
        ("canceled", "canceled"),
        ("finished", "finished")
    ]
    date_time = models.DateTimeField()
    customer = models.CharField(max_length=100)
    vip_status = models.BooleanField(default=False)
    vin = models.CharField(max_length=100)
    reason = models.CharField(max_length=200)
    appt_status = models.CharField(
        max_length=100,
        choices=appt_status_choices,
        default="created"
        )
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
        )

    def update_vip_status(self):
        matching_auto = AutoVO.objects.filter(vin=self.vin, sold=True)
        if matching_auto.exists():
            self.vip_status = True
