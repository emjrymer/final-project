from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.contrib.auth import views as auth_views
from florist_app.views import UserCreateAPIView, ArrangementListCreateAPIView, ArrangementRetrieveUpdateDestroyAPIView, FloristListCreateAPIView, FloristRetrieveUpdateDestroyAPIView, BasketListCreateAPIView, BasketRetrieveUpdateDestroyAPIView, BuyerListCreateAPIView, BuyerRetrieveUpdateDestroyAPIView


urlpatterns = [
    url(r'^$', 'florist_app.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', auth_views.login, name="login_view"),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^media/(?P<path>.*)', "django.views.static.serve", {"document_root": settings.MEDIA_ROOT}),
    #  API VIEWS
    url(r'^signup/$', UserCreateAPIView.as_view(), name='user_create_api_view'),
    url(r'^api/florists/$', FloristListCreateAPIView.as_view(), name='florist_list_create_api_view'),
    url(r'^api/florists/(?P<pk>\d+)/$', FloristRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^api/baskets/$', BasketListCreateAPIView.as_view(), name='basket_list_create_api_view'),
    url(r'^api/baskets/(?P<pk>\d+)/$', BasketRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^api/arrangements/$', ArrangementListCreateAPIView.as_view(), name='arrangement_list_create_api_view'),
    url(r'^api/arrangements/(?P<pk>\d+)/$', ArrangementRetrieveUpdateDestroyAPIView.as_view()),
    url(r'^api/buyers/$', BuyerListCreateAPIView.as_view(), name='buyer_list_create_api_view'),
    url(r'^api/buyers/(?P<pk>\d+)/$', BuyerRetrieveUpdateDestroyAPIView.as_view()),
]
