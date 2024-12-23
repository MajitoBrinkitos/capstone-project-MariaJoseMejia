const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express ();

//EJS as the view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static("public"));

//login
app.get("/", (req, res) => {
    res.render("login");
});

//signup
app.get("/signup", (req, res) => {
    res.render("signup");
});

//Listening port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})