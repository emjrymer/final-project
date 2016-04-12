# all the django imports
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.views.generic import TemplateView
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
    serializer_class = ArrangementSerializer
    permission_classes = (IsAuthenticated,)

    def queryset(self):
        return Arrangement.objects.filter(florist_id=self.kwargs['pk'])

    def create(self, request, *args, **kwargs):
        request.data['florist'] = request.user.pk
        return super().create(request, *args, **kwargs)


class ArrangementRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArrangementSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    def queryset(self):
        return Arrangement.objects.filter(florist_id=self.request.user)


class BasketListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BasketSerializer
    permission_classes = (IsAuthenticated,)


class BasketRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BasketSerializer
    authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAuthenticated, )

    def queryset(self):
        return Basket.objects.filter(user_id=self.request.user)


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
