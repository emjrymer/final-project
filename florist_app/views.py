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
from florist_app.models import Arrangement, Cart, Florist, Buyer
from florist_app.serializers import UserSerializer, ArrangementSerializer, CartSerializer, FloristSerializer, BuyerSerializer


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


class ArrangementListCreateAPIView(generics.ListCreateAPIView):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer
    permission_classes = (AllowAny ,)

    def create(self, request, *args, **kwargs):
        request.data['florist'] = request.user.pk #maybe this should have self infront of it? self.request.user.pk
        return super().create(request, *args, **kwargs)


class ArrangementRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Arrangement.objects.all()
    serializer_class = ArrangementSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    # def get_queryset(self):
        # return Arrangement.objects.filter(florist_id=self.request.user)


class ArrangementListAPIView(generics.ListAPIView):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    def get(self, *args, **kwargs):
        arrangement = Arrangement.objects.get(id=self.kwargs.get('pk'))
        serializer = ArrangementSerializer(arrangement)
        return JsonResponse(serializer.data)


class CartListCreateAPIView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Cart.objects.filter(consumer_id=self.request.user)

    def create(self, request, *args, **kwargs):
        request.data['consumer'] = request.user.pk #maybe this should have self infront of it? self.request.user.pk
        return super().create(request, *args, **kwargs)


class CartRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    def queryset(self):
        return Cart.objects.filter(user_id=self.request.user)


class FloristListCreateAPIView(generics.ListCreateAPIView):
    queryset = Florist.objects.all()
    serializer_class = FloristSerializer
    permission_classes = (IsAuthenticated,)


class FloristRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Florist.objects.all()
    serializer_class = FloristSerializer
    permission_classes = (IsAuthenticated,)


class FloristSpecificArrangementListAPIView(generics.ListAPIView):
    serializer_class = ArrangementSerializer
    permission_classes = (IsAuthenticated,)

    def queryset(self):
        return Arrangement.objects.filter(florist_id=self.kwargs['pk'])


# ignore this information for now
class BuyerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer
    permission_classes = (IsAuthenticated,)


class BuyerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer
    permission_classes = (IsAuthenticated,)
