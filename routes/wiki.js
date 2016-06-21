var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/');
});

router.post('/', function(req, res) {
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res) {
  res.render('addpage', { author: 'Bob', email: 'bob@example.com', content: 'A great article', status: 'open'  });
});

module.exports = router;
