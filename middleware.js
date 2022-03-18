const User = require("./models/user");

function isLoggedIn(req, res, next) {
  
}

async function addUserLocal(req, res, next) {
  const user = await User.findById(req.session.user);
  if (user) {
    res.locals.currentUser = user;
  } else {
    res.locals.currentUser = null;

  }
  next();
}


//Exports
module.exports.isLoggedIn = isLoggedIn;
module.exports.addUserLocal = addUserLocal;