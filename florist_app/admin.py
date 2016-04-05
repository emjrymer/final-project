from django.contrib import admin
from florist_app.models import Arrangement, Basket, Florist, Buyer

admin.site.register([Arrangement, Basket, Florist, Buyer])
