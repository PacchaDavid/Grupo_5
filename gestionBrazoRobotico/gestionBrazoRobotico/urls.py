from django.urls import path, include
from .views import *
from . import views
from rest_framework import routers


urlpatterns = [
    path('',views.home,name='home'),
    path('aboutus/', views.about_us,name='about_us'),
    path('info/',views.info,name='info'),
    path('controls/',views.controls,name='controls'),
    path('randomuser/',views.random_user,name='randomuser'),
    path('chiste/',views.chiste_del_dia,name='chiste_del_dia'),
    path('controls2/',views.control2,name='controls2'),
    path('',include('login.urls')),
]