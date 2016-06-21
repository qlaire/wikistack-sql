var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird');

function throwError(error) {
  res.render('error', error);
}

// router.get('/', function(req, res) {
//   var userPromise = User.findAll();
//   userPromise.then(function(data) {
//     var users = data.map(function(datum) {
//       return datum.dataValues;
//     });
//     res.render('users', {users: users});
//   })
//   .catch(throwError);
// });

router.get('/', function(req, res, next) {
  User.findAll({}).then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});

router.get('/:id', function(req, res) {
  var userPromise = User.findAll({
    where: {id: req.params.id}
  });
  var pagePromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });
  Promise.all([userPromise, pagePromise])
  .then(function (data) {
    var user = data[0];
    var pages = data[1];
    res.render('userprofile', {user: user, pages: pages})
  })

});


module.exports = router;
