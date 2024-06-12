const path = require("path");

const errorController = require("./controllers/error");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require('express-handlebars')

const adminRouts = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// app.engine('handlebars', expressHbs({
//   layoutsdir: 'views/layouts/',
//   defaultLayout: 'main-layout',
//   extname: 'handlebars'
// }));
// app.set('view engine', 'handlebars');
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouts);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
