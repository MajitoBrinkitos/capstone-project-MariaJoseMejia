const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express ();

//EJS as the view engine
app.set('view engine', 'ejs');


//Listening port
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})