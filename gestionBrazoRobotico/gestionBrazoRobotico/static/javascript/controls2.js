
//Botones de Control y Sliders
var buttonArriba = document.getElementById("arriba");
var buttonAbajo = document.getElementById("abajo");
var buttonIzquierda = document.getElementById("izquierda");
var buttonDerecha = document.getElementById("derecha");
var buttonAdelante = document.getElementById("adelante");
var buttonAtras = document.getElementById("atras");
var buttonPinza = document.getElementById("pinza");
var inputFlash = document.getElementById("flashControl");
var flashValue = document.getElementById("flashValue");
var conectarButton = document.getElementById("conectar");
var ipInput = document.getElementById("ipInput");
var desconectarButton = document.getElementById("cerrarConexion");


//Angulos de los Servos
var angle1 = 90;
var angle2 = 90;
var angle3 = 90;
var anglePinza = 80;

//Dirección IP
var ipDirection = '';

//Intervals
var intervalArriba = null;
var intervalAbajo = null;
var intervalIzquierda = null;
var intervalDerecha = null;
var intervalAdelante = null;
var intervalAtras = null;
var interval = null;

//WebSockets
let websocketCamera = null;
let websocketServoInput = null;


//Eventos
conectarButton.onclick = function() {
    if (validarIPv4(ipInput.value)) {  
        ipDirection = ipInput.value;
        initWebSocket();
    } else {
        alert("La dirección IP no es válida.");
    }
}

flashControl.addEventListener("input", function() {
    flashValue.textContent = 'Flash: ' + inputFlash.value;
});

function controlSlider(slider, plus) {
    if (!interval) {
        interval = setInterval(function() {
            if(plus === -1) {
                slider.value = parseInt(slider.value) - 5;
            } else if(plus === 1) {
                slider.value = parseInt(slider.value) + 5;
            }
            flashValue.textContent = 'Flash: ' + slider.value;
            sendButtonInput("Flash", slider.value);
        }, 30);
    }
}

function controlButton(button) {
    switch(button) {
        case "arriba":
            if (!intervalArriba) {
                intervalArriba = setInterval(function() {
                    (angle1<180) ? angle1 += 1 : angle1 = 180;
                    sendButtonInput("Base", angle1);
                    console.log('angle1: ' + angle1);
                }, 30);
            }
            break;
        case "abajo":
            if (!intervalAbajo && angle1 > 0) {
                intervalAbajo = setInterval(function() {
                    (angle1>0) ? angle1 -= 1 : angle1 = 0;
                    sendButtonInput("Base", angle1);
                    console.log('angle1: ' + angle1);
                }, 30);
            }
            break;
        case "izquierda":
            if (!intervalIzquierda && angle2 < 180) {
                intervalIzquierda = setInterval(function() {
                    (angle2<180) ? angle2 += 1 : angle2 = 180;
                    sendButtonInput("Hombro", angle2);
                    console.log('angle2: ' + angle2);
                }, 30);
            }
            break;
        case "derecha":
            if (!intervalDerecha && angle2 > 0) {
                intervalDerecha = setInterval(function() {
                    (angle2>0) ? angle2 -= 1 : angle2 = 0;
                    sendButtonInput("Hombro", angle2);
                    console.log('angle2: ' + angle2);
                }, 30);
            }
            break;
        case "adelante":
            if (!intervalAdelante && angle3 < 180) {
                intervalAdelante = setInterval(function() {
                    (angle3<180) ? angle3 += 1 : angle3 = 180;
                    sendButtonInput("Codo", angle3);
                    console.log('angle3: ' + angle3);
                }, 30);
            }
            break;
        case "atras":
            if (!intervalAtras && angle3 > 0) {
                intervalAtras = setInterval(function() {
                    (angle3>0) ? angle3 -= 1 : angle3 = 0;
                    sendButtonInput("Codo", angle3);
                    console.log('angle3: ' + angle3);
                }, 30);
            }
            break;
    }
}

document.addEventListener("keydown", function(event) {
    console.log(event.key)
    switch(event.key) {
        case "ArrowUp":
            event.preventDefault();
            controlButton("arriba");
            buttonArriba.style.backgroundColor = "rgb(0, 255, 0)";
            break;
        case "ArrowDown":
            event.preventDefault();
            controlButton("abajo");
            buttonAbajo.style.backgroundColor = "rgb(0, 255, 0)";
            break;
        case "ArrowLeft":
            controlButton("izquierda");
            buttonIzquierda.style.backgroundColor = "rgb(0, 255, 0)";
            break;
        case "ArrowRight":
            controlButton("derecha");
            buttonDerecha.style.backgroundColor = "rgb(0, 255, 0)";
            break;
        case "w":
            controlButton("adelante");
            buttonAdelante.style.backgroundColor = "rgb(0, 255, 0)";
            break;
        case "s":
            controlButton("atras");
            buttonAtras.style.backgroundColor = "rgb(0, 255, 0)";
            break;
        case "a":
            controlSlider(inputFlash, -1);
            break;
        case "d":
            controlSlider(inputFlash, 1);
            break;
        case " ":
            event.preventDefault();
            buttonPinza.click();
            break;
    }
});

buttonPinza.onclick = function() {
    buttonPinza.style.backgroundColor = "rgb(0, 255, 0)";
    if(anglePinza <= 80) {
        anglePinza = 150;
    } else {
        anglePinza = 80;
    }
    sendButtonInput("Pinza", anglePinza);
}

document.addEventListener("keyup", function(event) {

    if(intervalArriba) {
        clearInterval(intervalArriba);
        intervalArriba = null;
    }
    if(intervalAbajo) {
        clearInterval(intervalAbajo);
        intervalAbajo = null;
    }
    if(intervalIzquierda) {
        clearInterval(intervalIzquierda);
        intervalIzquierda = null;
    }
    if(intervalDerecha) {
        clearInterval(intervalDerecha);
        intervalDerecha = null;
    }
    if(intervalAdelante) {
        clearInterval(intervalAdelante);
        intervalAdelante = null;
    }
    if(intervalAtras) {
        clearInterval(intervalAtras);
        intervalAtras = null;
    }
    if(interval) {
        clearInterval(interval);
        interval = null;
    }

    switch(event.key) {
        case "ArrowUp":
            buttonArriba.style.backgroundColor = "black";
            break;
        case "ArrowDown":
            buttonAbajo.style.backgroundColor = "black";
            break;
        case "ArrowLeft":
            buttonIzquierda.style.backgroundColor = "black";
            break;
        case "ArrowRight":
            buttonDerecha.style.backgroundColor = "black";
            break;
        case "w":  
            buttonAdelante.style.backgroundColor = "black";
            break;
        case "s":  
            buttonAtras.style.backgroundColor = "black";
            break;
        case " ":
            buttonPinza.style.backgroundColor = "black";
            break;
    }
});

function initCameraWebSocket() 
{
    websocketCamera = new WebSocket('ws://' + ipDirection + '/Camera');
    websocketCamera.binaryType = 'blob';
    websocketCamera.onopen    = function(event){};
    //websocketCamera.onclose   = function(event){setTimeout(initCameraWebSocket, 2000);};
    websocketCamera.onmessage = function(event)
    {
    var imageId = document.getElementById("cameraImage");
    imageId.src = URL.createObjectURL(event.data);
    };
}

function initServoInputWebSocket() 
{
    websocketServoInput = new WebSocket('ws://' + ipDirection + '/ServoInput');
    websocketServoInput.onopen    = function(event)
    {   
        ipInput.style.display = "none";
        conectarButton.style.display = "none";
        desconectarButton.style.display = "inline";     
        sendButtonInput("Base", baseInput.value);
        sendButtonInput("Hombro", hombroInput.value);
        sendButtonInput("Codo", codoInput.value);   
        sendButtonInput("Pinza", pinzaInput.value);        
    };
    websocketServoInput.onclose   = function(event){
        //setTimeout(initServoInputWebSocket, 2000);
        ipInput.style.display = "inline";
        conectarButton.style.display = "inline";
    };
    websocketServoInput.onmessage = function(event){};        
}

function initWebSocket() 
{
    initCameraWebSocket ();
    initServoInputWebSocket();
}

desconectarButton.onclick = cerrarConexionWebsocket;

function cerrarConexionWebsocket() {
    websocketCamera.close();
    websocketServoInput.close();
    desconectarButton.style.display = 'none';
}


function sendButtonInput(key, value) 
{
    var data = key + "," + value;
    websocketServoInput.send(data);
}

function validarIPv4(ip) {
    var ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    var match = ipv4Regex.exec(ip);

    if (!match) {
        return false; 
    }
    
    for (var i = 1; i <= 4; i++) {
        if (parseInt(match[i], 10) > 255) {
            return false; 
        }
    }

    return true; 
}

