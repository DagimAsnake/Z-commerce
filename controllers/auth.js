const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getLogin = async (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: "login",
    path: "/login",
    errorMessage: message,
  });
};

exports.getSignup = async (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/signup", {
    pageTitle: "signup",
    path: "/signup",
    errorMessage: message,
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }

  const doMatch = await bcrypt.compare(password, user.password);

  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      return res.redirect("/");
    });
  }
  req.flash("error", "Invalid email or password");
  res.redirect("/login");
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  const userDoc = await User.findOne({ email: email });

  if (userDoc) {
    req.flash("error", "Email already exists. Try another one");
    return res.redirect("/signup");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    email: email,
    password: hashedPassword,
    cart: { items: [] },
  });

  await user.save();

  res.redirect("/login");
};

exports.postLogout = async (req, res, next) => {
  req.session.destroy((err) => {
    // console.log(err);
    res.redirect("/");
  });
};
