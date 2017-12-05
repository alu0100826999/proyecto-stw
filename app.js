var express = require('express')
var app = express()
var path = require ('path');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
//var comparar = require('@ull-andrea-carlos/comparar');
var mongoose = require('mongoose');

//permite coger parámetros de la url(query string)
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/usersbh', function(error){
  if (error) {
    throw error; 
  } else {
    console.log('Conectado a MongoDB');
  }
});

// This is our mongoose model for todos
var Schema = mongoose.Schema({
    usuario: Number,
    contrasena: String
});

//Creamos el modelo a partir del squema
var Usuarios = mongoose.model('Usersbh', Schema);

app.use(session({
    secret: 'example',
    resave: true,
    saveUninitialized: true
}));

//Comprueba si ya esta autorizado en esta sesion
var auth = function(req, res, next) {

  Usuarios.findOne({usuario: req.session.user}, function (err, result) {
    if (err) {
      console.log(err);
      res.send("ERROR");
    } else {
      if (result != null) {

        if (req.session) {
          return next();
        } else {
          return res.sendStatus(401);
        }

      } else {
        return res.sendStatus(401);
      }

    }

  })

};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.static('./pagina_web'));
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
	res.render('pagina_web/index');
})

//Muestra la vista con el formulario para log in
app.get('/login', function(req, res){
  res.render('pagina_web/login');
});

app.get('/registrar', function(req, res){
  res.render('pagina_web/registrar')
})

var registrar = function (user, pass) {

  console.log('Saved:');
  console.log('Usuario: ', user);
  console.log('Contrasena: ', pass);

  usuario1 = new Usuarios ({"usuario": user, "contrasena": bcrypt.hashSync(pass)}, function (err, result) {
    if (err) return handleError(err);
  })

  usuario1.save (function (err) {
    if (err) return handleError(err);
  })

};

app.post('/registrar', function(req, res) {

  if (!req.body.username || !req.body.password) { //campos imvalidos o nulos

    console.log('registrar failed');
    res.render('pagina_web/registrar');

  } else {

    Usuarios.findOne({usuario: req.body.username}, function (err, result) {
      if (err) {
        console.log(err);
        res.send("ERROR");
      } else {

        if (result != null) {

          console.log('Usuario ya registrado')
          console.log(result.usuario)
          res.render('pagina_web/registrar');

        } else {

          registrar(req.body.username, req.body.password);
          res.render('pagina_web/login');

        }

      }

    })
  
  }

});

app.post('/login', function(req, res) {

  if (!req.body.username || !req.body.password) { //campos invalidos o nulos

    console.log('Rellene los campos');
    res.render('pagina_web/login');


  } else {

    Usuarios.findOne({usuario: req.body.username}, function (err, result) {
      if (err) {
        console.log(err);
        res.send("ERROR");
      } else {

        if (result != null) {
          
          if (result.username = req.body.username && bcrypt.compareSync(req.body.password, result.contrasena)) {
            req.session.user = req.body.username;
            req.session.admin = true;
            console.log('Usuario correcto');
            console.log('Usuario: ', result.usuario);
            res.render('pagina_web/index'); //cuando tengamos las paginas para reservar, lo ponemos
          }

        } else {

          console.log('login failed');
          res.render('pagina_web/login');
          
        }

      }

    })

  }

});

//Borra la sesion.
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.render('pagina_web/index');
});


var server = app.listen(process.env.PORT || 8080, ()=> {
  var host = server.address().address
  var port = server.address().port

  console.log('Conectado al puerto 8087')
})
