# all the django imports
from django.contrib.auth import authenticate, login, logout
from django.views.generic import TemplateView, DetailView, View
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.template.context import RequestContext
# rest_framework imports
from rest_framework import generics
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
# florist_app imports
from florist_app.models import Arrangement, Cart, Enjoyer
from florist_app.serializers import UserSerializer, ArrangementSerializer, CartSerializer, EnjoyerSerializer
import stripe
from django.shortcuts import render


def login_view(request):
    return render_to_response('login.html', context=RequestContext(request))


def home(request):
   context = RequestContext(request,{'request': request,'user': request.user})
   return render_to_response('home.html', context_instance=context)


class AboutUs(TemplateView):
    template_name = 'about.html'


def logout_view(request):
    auth_logout(request)
    return redirect('/')


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


#################  API Views  ####################


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


######## #gallery view permission_classes = (AllowAny, ) ########
class ArrangementListCreateAPIView(generics.ListCreateAPIView):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer
    permission_classes = (AllowAny ,)

    def create(self, request, *args, **kwargs):
        request.data['posting_user'] = request.user.pk
        return super().create(request, *args, **kwargs)
################################################################


class ArrangementRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArrangementSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Arrangement.objects.filter(posting_user_id=self.request.user.id)


####### Maybe this can be for the #arrangements view ########
class ArrangementListAPIView(generics.ListAPIView):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get(self, *args, **kwargs):
        arrangement = Arrangement.objects.get(id=self.kwargs.get('pk'))
        serializer = ArrangementSerializer(arrangement)
        return JsonResponse(serializer.data)
############################################################


class CartListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Cart.objects.filter(buyer_id=self.request.user)

    def create(self, request, *args, **kwargs):
        request.data['buyer'] = request.user.pk
        return super().create(request, *args, **kwargs)


class CartRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Cart.objects.filter(buyer_id=self.request.user)


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
class Charge(View):

    def post(self, request):
        stripe.api_key = 'sk_test_XeHx9P8aspTb67eQiiMZx6w1'
        amount = 1000
        customer = stripe.Customer.create(
            email=request.POST["stripeEmail"],
            card=request.POST['stripeToken']
        )
        charge = stripe.Charge.create(
            customer=customer.id,
            amount=amount,
            currency="usd",
            description="Unlimited Questions"
        )
        return render(request, 'about.html')
