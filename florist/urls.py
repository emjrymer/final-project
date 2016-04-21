from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.contrib.auth import views as auth_views
from florist_app.views import ArrangementListAPIView, AboutUs, EnjoyerSpecificArrangementListAPIView, api_login, \
    api_logout, UserCreateAPIView, ArrangementListCreateAPIView, ArrangementRetrieveUpdateDestroyAPIView, \
    EnjoyerListCreateAPIView, EnjoyerRetrieveUpdateDestroyAPIView, CartListCreateAPIView, CartRetrieveUpdateDestroyAPIView, \
    Charge, PreviousOrdersByUser


urlpatterns = [
    url(r'^$', 'florist_app.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^about_us/$', AboutUs.as_view(), name='about_us_view'),
    url(r'^api/charge/$', Charge.as_view(), name='charge_view'),
    url(r'^orders/$', PreviousOrdersByUser.as_view(), name="previous_orders_by_user"),
#    url(r'^login/$', auth_views.login_social, name="login_view"),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^media/(?P<path>.*)', "django.views.static.serve", {"document_root": settings.MEDIA_ROOT}),
    #  API VIEWS
    url(r'^signup/$', UserCreateAPIView.as_view(), name='user_create_api_view'),
    url(r'^api/login/$', api_login, name='enjoyer_api_login_view'),
    url(r'^api/logout/$', api_logout, name='enjoyer_api_logout_view'),
    #  enjoyers/users
    url(r'^api/enjoyers/$', EnjoyerListCreateAPIView.as_view(), name='enjoyer_list_create_api_view'),
    url(r'^api/enjoyers/(?P<pk>\d+)/$', EnjoyerRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^api/enjoyer/(?P<pk>\d+)/arrangements/$', EnjoyerSpecificArrangementListAPIView.as_view(), name='enjoyer_specific_arrangement_list_api_view'),
    # cart/art
    url(r'^api/carts/$', CartListCreateAPIView.as_view(), name='cart_list_create_api_view'),
    url(r'^api/carts/(?P<pk>\d+)/$', CartRetrieveUpdateDestroyAPIView.as_view()),
    #arrangements/items
    url(r'^api/arrangements/$', ArrangementListCreateAPIView.as_view(), name='arrangement_list_create_api_view'),
    url(r'^api/arrangements/(?P<pk>\d+)/$', ArrangementRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^api/arrangementsByUser/$', ArrangementListAPIView.as_view(), name='individual_arrangements_by_enjoyer_detail_view'),
]
