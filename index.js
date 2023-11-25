const express = require("express");
const app = express();
const port = 3000;
const adminRoute = require("./routes/admin/index.route");
const database = require("./config/database");
const methodOverride = require('method-override');
const bodyParser = require("body-parser");

app.use(express.static("./public"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

database.connect()

app.set("views", "./views");
app.set("view engine", "pug");

adminRoute(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});