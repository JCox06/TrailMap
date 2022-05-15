const User = require("./models/user");
const Trail = require("./models/trail");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    
    next();
  } else {
    req.flash("error", "You must be logged in to complete that action");
    res.redirect("/auth/login");
  }
}

function addUserLocal(req, res, next) {
  const user = req.user;
  
  if (!user) {
    res.locals.currentUser = null;
  } else {
    res.locals.currentUser = user;
  }
  next();
}

async function validateTrailAuthor(req, res, next) {
  const currentUser = req.user;
  const { Tid } = req.params;


  const trail = await Trail.findById(Tid);

  if (trail.author.equals(currentUser._id)) {
    next();
  } else {
    req.flash("error", "You do not have the required permissions to complete that action");
    res.redirect(`/trails/${Tid}`);
  }
}

function addFlashMessages(req, res, next) {
  res.locals.message = req.flash("message");
  res.locals.error = req.flash("error");
  next();
}


//Exports
module.exports.isLoggedIn = isLoggedIn;
module.exports.addUserLocal = addUserLocal;
module.exports.validateTrailAuthor = validateTrailAuthor;
module.exports.addFlashMessages = addFlashMessages;