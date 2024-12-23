const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');


const app = express ();
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//EJS as the view engine
app.set('views');
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));

// Routes 
app.get('/', (req, res) => { 
    res.render('index'); 
});

app.get('/releases', (req, res) => { 
    res.render('releases'); 
});

app.get('/series', (req, res) => { 
    res.render('series'); 
});

//login
app.get("/login", (req, res) => {
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

    //check if the user already exists
    const existingUser = await collection.findOne({name: data.name});

    if(existingUser){
        res.send("User already exists. Please choose a different username.");
    }else {
        //hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }



/* 
    const userdata = await collection.insertMany(data);
    console.log(userdata); */
});

//Login user
app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            res.send("user name cannot found");
        }

        //database vs plain text
        const isPasswordMatch =  await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("index");
        } else {
            req.send("wrong password");
        }
    } catch {
        res.send("wrong details");
    }
});


//Listening port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})