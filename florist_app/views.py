# all the django imports
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render_to_response, redirect, render
from django.template.context import RequestContext
from django.views.generic import TemplateView, DetailView, View, ListView

# rest_framework imports
from rest_framework import generics
from rest_framework import views
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# florist_app imports
from florist_app.models import Arrangement, Cart, Enjoyer
from florist_app.serializers import UserSerializer, ArrangementSerializer, CartSerializer, EnjoyerSerializer

import stripe

##### function based views #####

# used for social login
def login_view(request):
    return render_to_response('login.html', context=RequestContext(request))

# used for social login
def logout_view(request):
    auth_logout(request)
    return redirect('/')

def home(request):
    context = RequestContext(request,{'request': request,'user': request.user})
    return render_to_response('home.html', context_instance=context)

@api_view(['POST'])
def api_login(request, *args, **kwargs):
    print("api login")
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    response_content = {}
    if user is not None:
        serializer = UserSerializer(user)
        if user.is_active:
            login(request, user)
            response_content = {'user': serializer.data, 'success': user.is_authenticated()}
            return JsonResponse(response_content)
    else:
        response_content = {'user': None, 'success': False}
        return JsonResponse(response_content)

@api_view()
def api_logout(request):
    serializer = UserSerializer(request.user)
    logout(request)
    return JsonResponse({'user': serializer.data, 'logged_out': True})

###### class based views #####
class AboutUs(TemplateView):
    template_name = 'about.html'


class PreviousOrdersByUser(ListView):
    model = Cart

    def get_context_data(self, **kwargs):
        context = super(PreviousOrdersByUser, self).get_context_data(**kwargs)
        context['previous_orders'] = Cart.objects.filter(buyer_id=self.request.user.id, paid=True)
        return context


###############################  API Views  ######################################

class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


# #gallery view permission_classes = (AllowAny, )
class ArrangementListCreateAPIView(generics.ListCreateAPIView):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer
    permission_classes = (AllowAny ,)

    def create(self, request, *args, **kwargs):
        request.data['posting_user'] = request.user.pk
        return super().create(request, *args, **kwargs)


class ArrangementRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArrangementSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Arrangement.objects.filter(posting_user_id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        request.data['posting_user'] = request.user.pk
        return super().create(request, *args, **kwargs)

# #arrangements view
class ArrangementListAPIView(generics.ListAPIView):
    serializer_class = ArrangementSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Arrangement.objects.filter(posting_user_id=self.request.user.id)


class CartListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Cart.objects.filter(buyer=self.request.user, paid=False)

    def create(self, request, *args, **kwargs):
        request.data['buyer'] = request.user.pk
        return super().create(request, *args, **kwargs)


class CartRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartSerializer
    authentication_classes = (SessionAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Cart.objects.filter(buyer=self.request.user)


class EnjoyerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Enjoyer.objects.all()
    serializer_class = EnjoyerSerializer
    permission_classes = (IsAuthenticated,)


class EnjoyerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enjoyer.objects.all()
    serializer_class = EnjoyerSerializer
    permission_classes = (IsAuthenticated,)


class EnjoyerSpecificArrangementListAPIView(generics.ListAPIView):
    serializer_class = ArrangementSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Arrangement.objects.filter(posting_user_id=self.kwargs['pk'])


################# stripe integration #####################
class Charge(views.APIView):

    def post(self, request):
        stripe.api_key = 'sk_test_XeHx9P8aspTb67eQiiMZx6w1'
        amount = request.data["amount"]
        customer = stripe.Customer.create(
            email=request.data["stripeEmail"],
            card=request.data['stripeToken']
        )
        charge = stripe.Charge.create(
            customer=customer.id,
            amount=amount,
            currency="usd",
            description="Unlimited Questions"
        )
        Cart.objects.filter(buyer=self.request.user, paid=False).update(paid=True)
        return Response({"success": True})
