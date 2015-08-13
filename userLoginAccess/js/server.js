 var express = require('express');
 var exphbs  = require('express-handlebars');
 var mysql = require('mysql'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
  //myConnection = require('express-myconnection');
  session = require('express-session');
 // var loggin = require('../routes/linkie');
// Configure Express

   // create a route
    var app = express();
    app.use(cookieParser());
    app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
   //app.use(myConnection(mysql, dbOptions, 'single'));
   app.engine('handlebars', exphbs({defaultLayout: 'main'}));
   app.set('view engine', 'handlebars');
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   var fs = require('fs');

  /* app.get('/linkie', checkUser, function(req, res){
  var userData = userService.getUserData();
  res.render('linkie', userData)
});*/

var user = {username:"Linkie", password:"546543"};
var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
    //res.render("/home")
  }
  else{// the user is not logged in redirect him to the login page
    res.redirect('/');
  }
};

 app.get('/', function(req, res){
  res.render('login')
});
app.post('/home', function(req, res){
  var formData = JSON.parse(JSON.stringify(req.body));

  if(user.username == formData.username){
    req.session.user = user.username;
    return res.redirect('home')
  }
  res.redirect('/')
});


app.get('/home', checkUser, function (req, res) {
  res.render('home')
});
 app.get('/logout', function(req, res){
  res.render('login')
});

  app.get('/signup', function(req, res){
  res.render('signup')
});
// app.get('/', function(req, res){
//   req.logout();
//   res.redirect('login');
// });
app.listen(5000);