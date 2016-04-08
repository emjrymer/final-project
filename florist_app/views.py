from django.shortcuts import render
from django.contrib.auth import authenticate
from django.views.generic import TemplateView
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.template.context import RequestContext
from rest_framework import generics
from rest_framework.decorators import api_view
from florist_app.models import Arrangement, Basket, Florist, Buyer
from florist_app.serializers import UserSerializer, ArrangementSerializer, BasketSerializer, FloristSerializer, BuyerSerializer


def login(request):
    return render_to_response('login.html', context=RequestContext(request))


def home(request):
   context = RequestContext(request,{'request': request,'user': request.user})
   return render_to_response('home.html', context_instance=context)


def logout(request):
    auth_logout(request)
    return redirect('/')


@api_view(['POST'])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username, password)
    if user is not None:
        return "User is authenticated" #success:True
    else:
        return "The username and password were incorrect."


#################  API Views  ####################


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ArrangementListCreateAPIView(generics.ListCreateAPIView):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer


class ArrangementRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer


class BasketListCreateAPIView(generics.ListCreateAPIView):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer


class BasketRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Basket.objects.all()
    serializer_class = BasketSerializer


class FloristListCreateAPIView(generics.ListCreateAPIView):
    queryset = Florist.objects.all()
    serializer_class = FloristSerializer


class FloristRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Florist.objects.all()
    serializer_class = FloristSerializer


class BuyerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer


class BuyerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer
