var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'One Day we gonna have some puppers in here!!!' });
});

module.exports = router;
