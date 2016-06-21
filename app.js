var express = require('express');
var app = express();
var swig = require('swig');
var routes = require('./routes/');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// templating boilerplate setup
app.engine('html', swig.renderFile); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
app.set('views', './views'); // where to find the views
swig.setDefaults({ cache: false });

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use(express.static('public'));

app.use('/', routes);

app.listen(3000, function() {
  console.log("listening");
});
