const express = require("express");
const app = express();
const port = 3000;
const adminRoute = require("./routes/admin/index.route");
const database = require("./config/database");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");

app.use(express.static("./public"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

// Flash
app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End Flash

database.connect()

app.set("views", "./views");
app.set("view engine", "pug");

adminRoute(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});