const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bosyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin123',
    
})

//server listining
app.listen(3000,() => {
    console.log('server running at post 3000');
});