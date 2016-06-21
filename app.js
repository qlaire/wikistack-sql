var express = require('express');
var app = express();
var swig = require('swig');
var wikiRouter = require('./routes/wiki');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var models = require('./models/');

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

app.use('/wiki', wikiRouter);

app.get('/', function(req, res) {
  res.render('index');
});

models.User.sync({})
.then(function() {
  return models.Page.sync({});
})
.then(function() {
  app.listen(3000, function() {
    console.log("listening");
  });
});
