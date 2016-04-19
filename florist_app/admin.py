from django.contrib import admin
from florist_app.models import Arrangement, Cart, Enjoyer

admin.site.register([Arrangement, Cart, Enjoyer])
