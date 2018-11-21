var express = require('express');
var router = express.Router();
let Usuario = require('../models/usuario');
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inicio' });
});

router.post('/inicio-registro', async(req, res, next) => {
  console.log(req.body)
  const user = await Usuario.findOne({ noCuenta: req.body.noCuenta });
  if(!user){
    return req.flash('errorMessage', 'No errors, you\'re doing fine');
    
  }
  console.log(user)
  return res.redirect('/formulario');
});

router.get('/formulario', function(req, res, next) {
  res.render('formulario', { title: 'formulario' });
});


router.get('/alumnos', function(req, res, next) {
  res.render('alumnos', { title: 'Alumnos' });
});

router.get('/profesores', function(req, res, next) {
  res.render('profesores', { title: 'Profesores' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


module.exports = router;
