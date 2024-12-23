const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express ();
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

//Register user
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const userdata = await collection.insertMany(data);
    console.log(userdata);
});

//Listening port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})