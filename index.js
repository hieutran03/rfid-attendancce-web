const express = require("express");
const https = require("https"); 
const fs = require("fs");

const app = express();
const port = 3000;
const adminRoute = require("./routes/admin/index.route");
const database = require("./config/database");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");


const options = { 
    key: fs.readFileSync("server.key"), 
    cert: fs.readFileSync("server.cert"), 
};

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
https.createServer(options, app).listen(port, () => {
    console.log(`App listening on port ${port}`);
});