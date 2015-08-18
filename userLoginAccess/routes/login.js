exports.checkUser = function(req, res, next){
  req.getConnection(function(error, connection){
    if(error){
      return next(error);
    }

    connection.query('SELECT * FROM users;', [], function(error, results) {
      if (error) {
        return next(error);
      }
      console.log(results);
      res.render('login', {
          login : results
      });
    });
  });
};