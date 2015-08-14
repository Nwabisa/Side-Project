exports.create = function(req, res) {

  if(req.method.toLowerCase() != "post") {
    res.render("signup", {layout: false});
  }
  else {
     new user(req.body).save();
     res.send("ok");
  }

}