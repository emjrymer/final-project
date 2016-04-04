from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import render_to_response, redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.template.context import RequestContext


def login(request):
    return render_to_response('login.html', context=RequestContext(request))


def home(request):
   context = RequestContext(request,{'request': request,'user': request.user})
   return render_to_response('home.html', context_instance=context)


def logout(request):
    auth_logout(request)
    return redirect('/')
