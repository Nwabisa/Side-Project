 var express = require('express');
 var exphbs  = require('express-handlebars');
 var mysql = require('mysql'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
  myConnection = require('express-myconnection');
  session = require('express-session');
  var userlog = require('../routes/login');

  dbOptions ={
   host: 'localhost',
   user: 'root',
   password: 'nwabisamilisantmasiko',
   port: 3306,
   database: 'SpazaApp'
 };


   // create a route
    var app = express();
    app.use(cookieParser());
    app.use(session({ secret: 'keyboard cat', resave : true, cookie: { maxAge: 60000 }}))
   app.use(myConnection(mysql, dbOptions, 'single'));
   app.engine('handlebars', exphbs({defaultLayout: 'main'}));
   app.set('view engine', 'handlebars');
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   var fs = require('fs');

  /* app.get('/linkie', checkUser, function(req, res){
  var userData = userService.getUserData();
  res.render('linkie', userData)
});*/


//var user = {"Linkie":"546543", "sibusiso":"coder123"};
// var checkUser = function(req, res, next){
//   if (req.session.user){
//     return next();
//     //res.render("/home")
//   }
//   else{// the user is not logged in redirect him to the login page
//     res.redirect('/');
//   }
// };
  
   app.get('/', userlog.checkUser, function(req, res){
   res.render('login')
 });

app.post('/home', function(req, res){
  res.render('home')
});



app.get('/home', function (req, res) {
  res.render('home')
});
 app.get('/logout', function(req, res){
  res.render('login')
});

  app.get('/signup', function(req, res){
  res.render('signup')
});
 app.post('/signup', function(req, res){
    res.redirect('signup')

});
// app.get('/', function(req, res){
//   req.logout();
//   res.redirect('login');
// });
app.listen(5000);