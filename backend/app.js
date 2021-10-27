const express = require("express");
const app = express();
const session = require("express-session");
const routerNotes = require("./src/routes/routerNotes");

app.use("/notes",routerNotes);
app.listen(process.env.PORT || 3005, ()=>{console.log("API running at port 3005")});