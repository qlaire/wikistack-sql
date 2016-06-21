var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("you got it");
  res.end();
});

module.exports = router;
