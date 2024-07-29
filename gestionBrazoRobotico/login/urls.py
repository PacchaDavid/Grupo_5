from django.urls import path,include
from .views import *

urlpatterns = [
    path('login/',login_usuario,name='login'),
    path('logout/',logout_usuario,name='logout'),
    path('registro/',registro,name='registro'),
]