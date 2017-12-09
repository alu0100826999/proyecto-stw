# PROYECTO FINAL SISTEMAS Y TECNOLOGÍAS WEB

## Nuevo enlace para la visualización de la página (por medio del iaas de Andrea):

* [Enlace](http://10.6.129.53:8080/)

## Enlace a la página (Heroku):

* [Heroku](https://bh-reservas.herokuapp.com/)

## TUTORIAL

### Para tener a punto el repo:
1. git clone URL
2. npm install (si npm no está instalado: sudo apt-get isntall npm). Este comando lo que hará es instalar todas las dependencias que se necesitan para que la aplicación corra perfectamente en nodejs. Las dependencias se encuentran especificadas en el fichero package.json.

### Para subir la app a Heroku (aquí hay un tutorial que siempre sigo: [TUTORIAL](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) ):
1. Si heroku no está descargado, descargar Heroku Cli. En el tutorial está en enlace. 
2. Loguearse en heroku: heroku login
3. Crear la rama remota a la app ya desplegada: git remote add heroku https://git.heroku.com/bh-reservas.git
4. Para actualizar la aplicación es necesario hacer:
 git add ., git commit -m "", git push heroku master.

### Para traerte una rama de github a local que no tienes creada:
* git checkout --track -b nombre-que-le-quieres-poner-a-la-rama origin/nombre-rama-en-github
