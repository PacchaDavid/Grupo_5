from django.urls import path, include
from .views import *
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'BrazoRobotico',BrazoRoboticoViewSet)
router.register(r'Esp32Cam',Esp32CamViewSet)
router.register(r'Camara',CamaraViewSet)
router.register(r'Pin',PinViewSet)
router.register(r'Protoboard',ProtoboardViewSet)
router.register(r'FuenteAlimentacion',FuenteAlimentacionViewSet)
router.register(r'ServoMotor',ServoMotorViewSet)

urlpatterns = [
    path('',views.home,name='home'),
    path('aboutus/', views.about_us,name='about_us'),
    path('info/',views.info,name='info'),
    path('randomuser/',views.random_user,name='randomuser'),
    path('chiste/',views.chiste_del_dia,name='chiste_del_dia'),
    path('controls2/',views.control2,name='controls2'),
    path('ayuda/',views.ayuda,name='ayuda'),
    path('api/',include(router.urls)),
    path('',include('login.urls')),
    
]