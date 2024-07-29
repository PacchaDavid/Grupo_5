from django.shortcuts import render, redirect
from rest_framework import viewsets
from .serializers import *
from . import services
from django.contrib.auth.decorators import login_required


def home(request):
    return render(request,'principal/index.html')

def about_us(request):
    return render(request,'principal/aboutus.html')

@login_required
def info(request):
    return render(request,'principal/info.html')

def materials(request):
    return render(request,'principal/materials.html')

def graphics(request):
    return render(request,'principal/graphics.html')

@login_required
def controls(request):
    return render(request,'controls/controls.html')

def random_user(request):
    return render(request,'principal/randomuser.html',services.get_random_user())

@login_required
def chiste_del_dia(request):
    return render(request,'principal/chiste.html',services.get_chiste())

def control2(request):
    return render(request,'controls/controls2.html')
