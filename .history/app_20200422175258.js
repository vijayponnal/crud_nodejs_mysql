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
    database:'node_js_crud',
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Db connected succesfully ok.');
});

//set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/',(req,res) => {

});
//server listining
app.listen(3000,() => {
    console.log('server running at post 3000');
});