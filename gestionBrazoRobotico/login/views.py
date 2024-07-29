from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .forms import RegistroFormulario
from django.contrib import messages

def registro(request):
    if request.method == 'POST':
        form = RegistroFormulario(request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            messages.success(request,'Registro exitoso. Has iniciado sesión!')
            return redirect('home')
        else:
            messages.error(request,'Error en el registro. Por favor, revisa el formulario')
    else:
        form = RegistroFormulario()
    return render(request,'registro.html',{'form':form})
    
def login_usuario(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request,user)
            return redirect('home')
        else:
            messages.error(request,'Nombre de usuario o contraseña incorrectos')
    else: 
        form = AuthenticationForm()
    return render(request, 'login.html', {'form' : form})
    
def logout_usuario(request):
    logout(request)
    return redirect('login')

@login_required 
def informacion_sensible(request):
    return render(request,'informacion_sensible.html',{})
    
