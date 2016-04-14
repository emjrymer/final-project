from django.contrib import admin
from florist_app.models import Arrangement, Cart, Florist, Buyer

admin.site.register([Arrangement, Cart, Florist, Buyer])
