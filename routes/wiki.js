var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page;
var User = models.User;

function throwError(error) {
  res.render('error', error);
}
router.post('/', function(req, res, next) {
  var formContent = req.body;
  User.findOrCreate({
    where: {
      name: formContent.author,
      email: formContent.email
    }
  })
  .then(function (values) {
    var user = values[0];
    var page = Page.build({
      title: formContent.title,
      content: formContent.content,
      status : formContent.status,
    });
    return page.save().then(function (page) {
      return page.setAuthor(user);
    });
  })
  .then(function(page) {
    res.redirect(page.url);
  })
  .catch(next);
});

router.get('/add', function(req, res) {
  // var requestContent = req.body
  // res.render('addpage', { author: 'Bob', email: 'bob@example.com', title: 'My First Article', content: 'A great article', status: 'open'  });
  res.render('addpage');
});

//set up dynamic page routes
router.get('/:urlTitle', function(req, res, next) {
  var pagePromise = Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [{
      model: User, as: 'author'
    }]
  });

  pagePromise.then(function success(page) {
    res.render('wikipage', {page: page});
  })
  .catch(next);
});

router.get('/', function(req, res) {
  var pagePromise = Page.findAll();
  pagePromise.then(function (data) {

    var pages = data.map(function(datum) {
      return datum.dataValues;
    });
    console.log(pages);
    res.render('index', {pages: pages});
  })
  .catch(throwError);
});



module.exports = router;
