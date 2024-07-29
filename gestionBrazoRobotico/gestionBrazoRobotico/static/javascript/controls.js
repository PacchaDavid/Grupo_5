var ipDirection = '22.12.45.2';

var baseInput = document.getElementById('Base');
var hombroInput = document.getElementById('Hombro');
var codoInput = document.getElementById('Codo');
var pinzaInput = document.getElementById('Pinza');

var buttonConection = document.getElementById('alternarConexion');
var inputIP = document.getElementById('direccionIP');

buttonConection.addEventListener('click', () => {
    if(buttonConection.textContent === 'Conectar') {
        ipDirection = inputIP.value;
        if(validarIPv4(ipDirection)) {
            initWebSocket();
        } else {
            inputIP.value = 'Dirección IP inválida!!';
            return;
        }
        inputIP.style.display = 'none';
        buttonConection.style.display = 'none';
    }
});

function initCameraWebSocket() 
{
    websocketCamera = new WebSocket('ws://' + '192.168.1.1' + '/Camera');
    websocketCamera.binaryType = 'blob';
    websocketCamera.onopen    = function(event){};
    websocketCamera.onclose   = function(event){setTimeout(initCameraWebSocket, 2000);};
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
        sendButtonInput("Base", baseInput.value);
        sendButtonInput("Hombro", hombroInput.value);
        sendButtonInput("Codo", codoInput.value);   
        sendButtonInput("Pinza", pinzaInput.value);        
    };
    websocketServoInput.onclose   = function(event){setTimeout(initServoInputWebSocket, 2000);};
    websocketServoInput.onmessage = function(event){};        
}

function initWebSocket() 
{
    initCameraWebSocket ();
    initServoInputWebSocket();
}


function sendButtonInput(key, value) 
{
    var data = key + "," + value;
    websocketServoInput.send(data);
}
    


baseInput.addEventListener('input', () => {
    document.getElementById('angle1').textContent = baseInput.value
});

hombroInput.addEventListener('input', () => {
    document.getElementById('angle2').textContent = hombroInput.value
});

codoInput.addEventListener('input', () => {
    document.getElementById('angle3').textContent = codoInput.value
});

pinzaInput.addEventListener('input', () => {
    document.getElementById('angle4').textContent = pinzaInput.value
});

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

