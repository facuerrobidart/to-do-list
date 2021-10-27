const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const routerNotes = require("./src/routes/routerNotes");
const routerUser = require("./src/routes/routerUser");
const methodOverride = require('method-override');
const cors = require("cors");

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(methodOverride("_method"));
app.use(session({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: false,
        secure: false,     
    },
}));
app.use(cookieParser());
app.use("/notes",routerNotes);
app.use("/users",routerUser);
app.listen(process.env.PORT || 3005, ()=>{console.log("API running at port 3005")});