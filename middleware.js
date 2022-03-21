const User = require("./models/user");
const Trail = require("./models/trail");

function isLoggedIn(req, res, next) {
  const user = req.session.user;
  if (user) {
    next();
  } else {
    req.flash("error", "You need to be logged in to complete this action");
    res.redirect("/auth");
  }
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

async function validateTrailAuthor(req, res, next) {
  const currentUser = req.session.user;
  const { Tid } = req.params;

  const trail = await Trail.findById(Tid);

  if (trail.isAuthor(currentUser)) {
    next();
    return;
  }

  req.flash("error", "User validation error");
  res.redirect(`/trails/${Tid}`);
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