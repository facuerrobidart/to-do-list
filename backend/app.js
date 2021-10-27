const express = require("express");
const app = express();
const session = require("express-session");
const routerNotes = require("./src/routes/routerNotes");
const routerUser = require("./src/routes/routerUser");
const methodOverride = require('method-override');
const cors = require("cors");

app.use(cors());
app.use(methodOverride("_method"));
app.use(session({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use("/notes",routerNotes);
app.use("/users",routerUser);
app.listen(process.env.PORT || 3005, ()=>{console.log("API running at port 3005")});