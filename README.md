# PIS_SegundoCiclo


Este es el repositorio oficial del Proyecto: TeleRobot Grupo5... Aquí es donde se encuentra el código fuente de la página web, más el código de arduino, los diagramas y un juego creado por los integrantes del equipo.

DIAGRAMA DE CLASES DEL PROYECTO

![brazoRobotico](https://github.com/user-attachments/assets/e5312774-2dc1-4acd-b76b-1b44fad07824)

CASOS DE USO

![casosDeUso](https://github.com/user-attachments/assets/e89552f9-38f2-4d84-9058-ec01fb1b3d03)

HISTORIAS DE USUARIO

![UH1](https://github.com/user-attachments/assets/6b1d95e4-7f6a-4e32-a1cf-6ce5f784c395)
![UH2](https://github.com/user-attachments/assets/37bae591-c3cb-4ee4-b7c7-b6d45b572709)
![UH3](https://github.com/user-attachments/assets/271452de-4cd6-4af8-887f-2e9a373f9304)

INSTRUCCIONES PARA UTILIZAR EL CODIGO DE LA PAGINA WEB

Prerrequisitos
- Tener instalado python en su equipo
- Tener instalado el gestor de dependencias pip
- Tener configurado python en las variables de entorno de su sistema
- Contar con un IDE de propósito general como Visual Studio Code o uno más orientado a django como Pycharm
- Tener virtualenv en su equipo (se puede obtener mediante pip) 

Aquí algunos enlaces para completar estos requisitos

https://www.bing.com/ck/a?!&&p=fda7a64617951239JmltdHM9MTcyMjEyNDgwMCZpZ3VpZD0xNmQ5ODcwNC0zM2I2LTZkNDgtMjhjZi05M2IxMzIxOTZjYWUmaW5zaWQ9NTIwMw&ptn=3&ver=2&hsh=3&fclid=16d98704-33b6-6d48-28cf-93b132196cae&psq=como+instalar+python&u=a1aHR0cHM6Ly9raW5zdGEuY29tL2VzL2Jhc2UtZGUtY29ub2NpbWllbnRvL2luc3RhbGFyLXB5dGhvbi8&ntb=1

https://www.bing.com/ck/a?!&&p=43ad509272750edfJmltdHM9MTcyMjEyNDgwMCZpZ3VpZD0xNmQ5ODcwNC0zM2I2LTZkNDgtMjhjZi05M2IxMzIxOTZjYWUmaW5zaWQ9NTIxNA&ptn=3&ver=2&hsh=3&fclid=16d98704-33b6-6d48-28cf-93b132196cae&psq=como+instalar+vscode&u=a1aHR0cHM6Ly9jb2RlLnZpc3VhbHN0dWRpby5jb20vZG93bmxvYWQ&ntb=1

Una vez que hayamos cumplido los requisitos podemos empezar

SIGA LAS INSTRUCCIONES

1. Clonar o descargar este repositorio en su máquina de trabajo.
2. Utilizar algún Entorno de desarrollo que le permita interactuar con la consola de comandos
3. Abrir la carpeta "gestionBrazoRobótico" desde su Entorno de desarrollo
4. Iniciar un nuevo entorno virtual (opcional y recomendado), si tiene virtualenv puede utilizar el comando 'virutalenv <nombre_del_entorno_virtual>'
6. Ejecutar el comando 'pip install -r requirements.txt' en la consola de su entorno
7. Ejecutar el comando 'python manage.py runserver' en la consola
8. Abrir el navegador e ingresar a la ruta 'localhost:8000'
9. Navegar a través del contenido de la página :)

NAVEGACION A TRAVÉS DE LA PÁGINA WEB

-> Ruta raiz '/'

![image](https://github.com/user-attachments/assets/e09b0910-603b-4a16-b16b-5426269b5a1f)

Es la ruta principal de nuestro proyecto que contiene un párrafo de bienvenida, un enlace al modelo en 3D del brazo robótico y otro hacia el repositorio principal del proyecto, es decir, este repositorio.

-> Ruta 'aboutus/'

![image](https://github.com/user-attachments/assets/0755f733-146a-41cc-ac88-bfb4b01f92aa)

Es la vista que muestra los integrantes de nuestro equipo fraternal e inseparable de trabajo, junto con un párrafo de descripción del proyecto en general

-> Ruta 'info/'

Es la primera vista protegida por un decorador '@login_required' que significa que solo los usuarios logueados pueden acceder a la vista.
Si desea ver el contenido de esta vista, usted puede utilizar las siguientes credenciales para loguearse.

User: 'pis_grupo_5'

Password: 'ProyectoIntegradorDeSaberesII'

![image](https://github.com/user-attachments/assets/4fd36a39-0d28-4e52-a145-d9121276e56f)

El contenido de esta vista consiste en información general del proyecto, así como enlaces a distintas fuentes de información técnica, también se encuentran los diagramas sobre los que se basa este proyecto

-> Ruta 'controls2/'

![image](https://github.com/user-attachments/assets/7e1c3bfd-f365-4e53-8859-939fc41b3706)

Este es el programa que nos ayuda a enviar datos al brazo robótico y a recibir las imágenes enviadas desde él. Posee una barra superior de navegación hacia el inicio (ruta '/') y otra hacia una vista de ayuda para el usuario.

-> Ayuda para el Usuario

![image](https://github.com/user-attachments/assets/807a7d7b-784b-4a92-aa13-0b9d63fcec40)

Se trata de una imagen descriptiva y con algunos pasos secuenciales para conectar el brazo a la interfaz


Otras vistas: 

- 'api/' sirve contenido en formato Json para otros desarrolladores está basado netamente en el diagrama de clases.
- 'randomuser/' es una vista de prueba para testear el API pública Random User
- 'chiste/' es una vista que contiene un chiste proporcionado por la Joke API
- 'login/' es la vista que proporciona al usuario una manera fácil de loguearse
- 'logout/' al ingresar esta ruta se cierra la sesión y se redirecciona a la vista login/
- 'register/' es una vista para crear un nuevo usuario con el cual acceder a las vistas protegidas por '@login_required'



Enlace hacia página web alternativa: https://pacchadavid.github.io/



