from django.db import models


class BrazoRobotico(models.Model):
    nombre = models.CharField(max_length=100)
    dimensiones = models.CharField(max_length=100)
    descripcion = models.TextField()
    material = models.CharField(max_length=100)
    esp32_cam = models.OneToOneField('Esp32Cam',on_delete=models.CASCADE)
    protoboard = models.OneToOneField('Protoboard', on_delete=models.CASCADE)
    fuente = models.OneToOneField('FuenteAlimentacion', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
    
    class Meta:
        permissions = [
            ("puede_crear_BrazoRobotico","Puede crear Brazo Robótico"),
            ("puede_editar_BrazoRobotico","Puede editar Brazo Robótico"),
            ("puede_borrar_BrazoRobotico","Puede borrar Brazo Robotico"),
        ]


class Esp32Cam(models.Model):
    numeroPines = models.IntegerField()
    fabricante = models.CharField(max_length=100)
    descripcion = models.TextField()
    camara = models.OneToOneField('Camara',on_delete=models.CASCADE)

    def __str__(self):
        return 'Esp32Cam' + ' - ' + str(self.id)
    
    
class Camara(models.Model):
    modelo = models.CharField(max_length=100)
    tamanio = models.FloatField()

    def __str__(self):
        return self.modelo

class Pin(models.Model):
    nombre = models.CharField(max_length=100)
    OPCIONES_TIPO_PIN = [
        ('alimentacion','Alimentación'),
        ('entrada_digital','Entrada Digital'),
        ('salida_digital','Salida Digital'),
        ('comunicacion','Comunicación'),
        ('entrada_analogica','Entrada Analógica'),
        ('salida_analogica','Salida_Analógica'),
        ('de_camara','De Cámara'),
        ('programacion','Programación'),
    ]
    tipoPin = models.CharField(
        max_length=100,
        choices=OPCIONES_TIPO_PIN,
        blank=True
    )
    esp32_cam = models.ForeignKey(Esp32Cam,on_delete=models.CASCADE)

    def get_categorias(self):
        return self.get_categorias.split(',')
    def __str__(self):
        return self.nombre
    
    
class Protoboard(models.Model):
    tamanio = models.FloatField()
    descripcion = models.TextField()
    
    def __str__(self):
        return 'Protoboard' + ' - ' + str(self.id)
    

class FuenteAlimentacion(models.Model):
    voltaje_in = models.FloatField()
    voltaje_out = models.FloatField()
    amperaje_in = models.FloatField()
    amperaje_out = models.FloatField()
    descripcion = models.TextField()
    TIPO_FUENTE_OPCIONES = [
        ('lineal','Lineal'),
        ('conmutada','Conmutada'),
        ('regulada','Regulada'),
        ('no_regulada','No Regulada'),
        ('dc','DC'),
        ('ac','AC'),
        ('bench','Bench'),
        ('atx','ATX'),
    ]
    tipo = models.CharField(
        max_length=100,
        choices=TIPO_FUENTE_OPCIONES,
        blank=True
    )
    def __str__(self):
        return 'Fuente - ' + str(self.id)
    
class Servo(models.Model):
    modelo = models.CharField(max_length=100)
    torque = models.FloatField()
    potencia = models.FloatField()
    brazo = models.ForeignKey(BrazoRobotico,on_delete=models.CASCADE)
    UBICACION_OPCIONES = [
        ('pinza','Pinza'),
        ('codo','Codo'),
        ('base','Base'),
        ('antebrazo','Antebrazo'),
    ]
    ubicacion = models.CharField(
        max_length=100,
        choices=UBICACION_OPCIONES,
        blank=True
    )

    def __str__(self):
        return self.modelo + '-' + self.ubicacion
    

class EventoRecoleccion(models.Model):
    ubicacion = models.CharField(max_length=100)
    fecha_recoleccion = models.DateField()
    hora_recoleccion = models.CharField(max_length=100)
    brazo = models.ForeignKey(BrazoRobotico,on_delete=models.CASCADE)

    def __str__(self):
        return 'Evento ' + str(self.id) + ' - ' + str(self.fecha_recoleccion)
    

class ObjetoResidual(models.Model):
    nombre = models.CharField(max_length=100)
    detalle = models.TextField()

    def __str__(self):
        return self.nombre