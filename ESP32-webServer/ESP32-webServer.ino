#include<WiFi.h>
#include<WebServer.h>
#include<ESP32Servo.h>

const char* ssid = "Mi-Red-WiFi";
const char* password = "contraseña";

Servo servo1, servo2, servo3;
WebServer server(80);

const char* htmlFile = R"(
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ControlServos</title>
  <style>
    /* Estilos para el contenedor */
    div {
      margin-bottom: 20px;
    }

    /* Estilos para la etiqueta */
    label {
      display: block;
      margin-bottom: 5px;
    }

    /* Estilos para el rango (slider) */
    input[type="range"] {
      width: 100%;
      margin-bottom: 5px;
    }

    /* Estilos para el span que muestra el valor del rango */
    #anguloPinza {
      display: inline-block;
      width: 30px;
      text-align: center;
    }

    /* Estilos para el botón */
    button {
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    /* Cambio de estilo al pasar el ratón sobre el botón */
    button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <h1>Control de tres Servomotores</h1>
  <div>
    <label for="slider_1">Base</label>
    <input type = "range" id = "slider_1" min = "0" max = "180" step = "1" value = "90">
    <span id = "anguloBase">90</span> grados
    <button id = "enviar_1">Enviar</button>
  </div>
  <div>
    <label for="slider_2">Codo</label>
    <input type = "range" id = "slider_2" min = "0" max = "180" step = "1" value = "90">
    <span id ="anguloCodo">90</span> grados
    <button id = "enviar_2">Enviar</button>
  </div>
  <div class = "slider-pinza">
    <label for="slider_3">Pinza</label>
    <input type = "range" id = "slider_3" min = "0" max = "180" step = "1" value = "90">
    <span id = "anguloPinza">90</span> grados
    <button id = "enviar_3">Enviar</button>
  </div>
  <script>
    var slider1 = document.getElementById('slider_1');
    var slider2 = document.getElementById('slider_2');
    var slider3 = document.getElementById('slider_3');
    var angle1 = document.getElementById('anguloBase');
    var angle2 = document.getElementById('anguloCodo');
    var angle3 = document.getElementById('anguloPinza');
    var enviar1 = document.getElementById('enviar_1');
    var enviar2 = document.getElementById('enviar_2');
    var enviar3 = document.getElementById('enviar_3');

    slider1.addEventListener('input',function(){
      angle1.textContent = slider1.value;
    });
    slider2.addEventListener('input',function(){
      angle2.textContent = slider2.value;
    });
    slider3.addEventListener('input',function(){
      angle3.textContent = slider3.value;
    });
    
    function enviarAngulo(nombre,angulo){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("Ángulo enviado: " + angulo);
        }
      };
      if(nombre === "angle1"){
        xhttp.open("GET", "/set_angle?angle1=" + angulo, true);
      }else if(nombre === "angle2"){
        xhttp.open("GET", "/set_angle?angle2=" + angulo, true);
      }else if(nombre === "angle3"){
        xhttp.open("GET", "/set_angle?angle3=" + angulo, true);
      }
      
      /* xhttp.open("GET", "/set_angle?angle=" + angulo, true); */
      xhttp.send();
    }

    enviar1.addEventListener('click',function(){
      enviarAngulo("angle1",slider1.value);
    });
    enviar2.addEventListener('click',function(){
      enviarAngulo("angle2",slider2.value);
    });
    enviar3.addEventListener('click',function(){
      enviarAngulo("angle3",slider3.value);
    });
  </script>
</body>
</html>
)";

void controlarServo(Servo& servo, int angulo){
  angulo = constrain(angulo,0,180);
  servo.write(angulo);
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid,password);
  while(WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.println("Conectando a Wifi ...");
  }
  Serial.println("Conectado exitosamente");
  Serial.print("Conectese a la siguiente dirección IP: ");
  Serial.println(WiFi.localIP());

  servo1.attach(2);
  servo2.attach(12);
  servo3.attach(13);

  server.on("/", HTTP_GET, [](){
    server.send(200,"text/html",htmlFile);
  });

  server.on("/set_angle", HTTP_GET, [](){
    if(server.hasArg("angle1")){
      int angulo = server.arg("angle1").toInt();
      controlarServo(servo1,angulo);
      server.send(200,"text/plain","angulo ajustado");
      return;
    }
    if(server.hasArg("angle2")){
      int angulo = server.arg("angle2").toInt();
      controlarServo(servo2,angulo);
      server.send(200,"text/plain","angulo ajustado");
      return;
    }
    if(server.hasArg("angle3")){
      int angulo = server.arg("angle3").toInt();
      controlarServo(servo3,angulo);
      server.send(200,"text/plain","angulo ajustado");
      return;
    }
    
    server.send(400,"text/plain","parametro 'angle' faltante");
    
  });

  server.begin();
  Serial.println("Servidor HTTP iniciado");
  
}

void loop() {
  server.handleClient();
}
