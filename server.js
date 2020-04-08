if (process.env.NODE_ENV !== 'production') {
  require('dotenv/config');
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Passport config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session 
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
})

// Routing
app.use("/", indexRouter);
app.use("/users", usersRouter);

//MongoDB Constructor and URL parser deprecation warning fix
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// DB connection
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// 404 Error page
app.use(function (req, res, next) {
  res.status(404).render('missing');
});



app.listen(process.env.PORT || 3000);