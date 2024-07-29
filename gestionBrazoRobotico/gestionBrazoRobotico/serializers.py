from rest_framework import serializers
from .models import *

class BrazoRoboticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrazoRobotico
        fields = '__all__'

class Esp32CamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Esp32Cam
        fields = '__all__'

class CamaraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camara
        fields = '__all__'

class PinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pin
        fields = '__all__'

class ProtoboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Protoboard
        fields = '__all__'
    
class FuenteAlimentacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuenteAlimentacion
        fields = '__all__'

class ServoMotorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servo
        fields = '__all__'
    
