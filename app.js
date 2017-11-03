var express = require('express')
var app = express()
var path = require ('path')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('./html'));

app.get('/', function (req, res) {
res.render('index.html', {title: 'Express'});
})

var server = app.listen(8080, function () {
var host = server.address().address
var port = server.address().port
console.log('Escuchando at http://%s:%s', host, port)
})
