var loggin = function(req, res, next){
  if (req.session.user){

  }
  // the user is not logged in redirect him/her to the login page
  res.redirect('login', {layout: false});
};