var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flash = require('req-flash');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
// Modelo de usuario
let Usuario = require('./models/usuario');

let readXlsxFile = require('read-excel-file/node');
var app = express();

mongoose.connect('mongodb://localhost:27017/unam-p5', {
    useCreateIndex: true,
    useNewUrlParser: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({ secret: '123' }));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// readXlsxFile('./AlumnosP5.xlsx').then((rows) => {
//   let nombre;
//   let noCuenta;
//   let user;
//   for (let i = 0; i < rows.length ; i++) {
//       nombre = rows[i][0].toString();
//       noCuenta = rows[i][1].toString();
//       user = new Usuario({
//           noCuenta: noCuenta,
//           nombre: nombre,
//           role: 'ALUMNO_ROLE'
//       })
//       user.save((err, usuarioGuardado) => {
//           if(err){
//               console.log(err)
//           }
//       });
      
//   }
// })
module.exports = app;
