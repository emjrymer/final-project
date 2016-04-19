from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.contrib.auth import views as auth_views
from florist_app.views import ArrangementListAPIView, AboutUs, FloristSpecificArrangementListAPIView, api_login, \
    api_logout, UserCreateAPIView, ArrangementListCreateAPIView, ArrangementRetrieveUpdateDestroyAPIView, \
    FloristListCreateAPIView, FloristRetrieveUpdateDestroyAPIView, CartListCreateAPIView, CartRetrieveUpdateDestroyAPIView, \
    BuyerListCreateAPIView, BuyerRetrieveUpdateDestroyAPIView, Charge


urlpatterns = [
    url(r'^$', 'florist_app.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^about_us/$', AboutUs.as_view(), name='about_us_view'),
    url(r'^charge/$', Charge.as_view(), name='charge_view'),
#    url(r'^login/$', auth_views.login_social, name="login_view"),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^media/(?P<path>.*)', "django.views.static.serve", {"document_root": settings.MEDIA_ROOT}),
    #  API VIEWS
    url(r'^signup/$', UserCreateAPIView.as_view(), name='user_create_api_view'),
    url(r'^api/login/$', api_login, name='user_api_login_view'),
    url(r'^api/logout/$', api_logout, name='user_api_logout_view'),
    url(r'^api/florists/$', FloristListCreateAPIView.as_view(), name='florist_list_create_api_view'),
    url(r'^api/florists/(?P<pk>\d+)/$', FloristRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^api/florist/(?P<pk>\d+)/arrangements/$', FloristSpecificArrangementListAPIView.as_view(), name='florist_specific_arrangement_list_api_view'),
    # cart/Cart
    url(r'^api/carts/$', CartListCreateAPIView.as_view(), name='cart_list_create_api_view'),
    url(r'^api/carts/(?P<pk>\d+)/$', CartRetrieveUpdateDestroyAPIView.as_view()),
    #arrangements/items
    url(r'^api/arrangements/$', ArrangementListCreateAPIView.as_view(), name='arrangement_list_create_api_view'),
    url(r'^api/arrangements/(?P<pk>\d+)/$', ArrangementRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^api/arrangementdetail/(?P<pk>\d+)/$', ArrangementListAPIView.as_view(), name='individual_arrangement_detail_view'),
    # don't worry about buyers for now
    # add a view to see previous orders(Carts) by specific buyer
    url(r'^api/buyers/$', BuyerListCreateAPIView.as_view(), name='buyer_list_create_api_view'),
    url(r'^api/buyers/(?P<pk>\d+)/$', BuyerRetrieveUpdateDestroyAPIView.as_view()),
]
