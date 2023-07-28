# CarCar

Team:

* Ian Hobbs - Sales
* Ellie Tiglao - Service

## Design

## Service microservice

Back end:
Models:
Appointment (entity)
Technician (entity)
Automobile VO - polls Inventory

HTTP Methods:
Get list, get details, post, delete, update

Additional Endpoints:
Cancel appt, Finish appt


Front end components:
Add technician
List all technicians
Create service appointment
List all service appointments
Service History
Features: VIP status, appointment status

Work plan:
- Automovile VO model, set up poller
- Technician HTTP methods
- Appointment HTTP methods
- Technician front end
- Appt front end
- Service History
- Features


## Sales microservice

Explain your models and integration with the inventory
microservice, here.

The connection between the inventory microservice and sales microservice is through the
Automobile Value object which is generated from the poller. The poller gets data by
making an API call to the inventory microservice and gets the automobile model info
that the inventory microservice needs (the vin and sold status). The poller updates
once a minute, so it is possible to create a vehicle and not have it show up on the
front end immediately.

Besides the automobile VO, there is a customer, sales and salesperson model. The
salesperson and customer model are straightforward, but the sale model has three
foreign key relationships to the other models.
