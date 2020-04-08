

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const itemsRouter = require("./routes/item")

// EJS
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

// Routing
app.use("/", indexRouter);

app.use("/items", itemsRouter);

// 404 Error page
app.use(function (req, res, next) {
  res.status(404).render('missing');
});



app.listen(process.env.PORT || 80);