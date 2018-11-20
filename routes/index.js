var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio' });
});

router.get('/alumnos', function(req, res, next) {
  res.render('alumnos', { title: 'Alumnos' });
});


module.exports = router;
