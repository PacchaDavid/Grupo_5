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

def random_user(request):
    return render(request,'principal/randomuser.html',services.get_random_user())

@login_required
def chiste_del_dia(request):
    return render(request,'principal/chiste.html',services.get_chiste())

@login_required
def control2(request):
    return render(request,'controls/controls2.html')

@login_required
def ayuda(request):
    return render(request,'controls/ayuda.html')

class BrazoRoboticoViewSet(viewsets.ModelViewSet):
    queryset = BrazoRobotico.objects.all()
    serializer_class = BrazoRoboticoSerializer

class Esp32CamViewSet(viewsets.ModelViewSet):
    queryset = Esp32Cam.objects.all()
    serializer_class = Esp32CamSerializer

class CamaraViewSet(viewsets.ModelViewSet):
    queryset = Camara.objects.all()
    serializer_class = CamaraSerializer

class PinViewSet(viewsets.ModelViewSet):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer

class ProtoboardViewSet(viewsets.ModelViewSet):
    queryset = Protoboard.objects.all()
    serializer_class = ProtoboardSerializer

class FuenteAlimentacionViewSet(viewsets.ModelViewSet):
    queryset = FuenteAlimentacion.objects.all()
    serializer_class = FuenteAlimentacionSerializer

class ServoMotorViewSet(viewsets.ModelViewSet):
    queryset = Servo.objects.all()
    serializer_class = ServoMotorSerializer