
const User = require("../models/user")

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Successfully signed up!");
      res.redirect("/listings");
    });
  } catch {
    req.flash("error", "Something went wrong!");
    res.redirect("/signup");
    console.log(error)
  }
};


//Login Form 

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};



// Login
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};



// LogOut

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logout!");
    res.redirect("/listings");
  });
};
