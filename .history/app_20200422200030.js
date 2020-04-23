const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
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
    else console.log('Db connected succesfully ');
});

//set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.get('/',(req,res) => {
    let sql="select * from users";
    let query= connection.query(sql,(err,rows)=>{
        if(err) throw err;
        res.render('user_index',{
            title: 'CRUD Operation in node js',
            users: rows
        });
    });
});

//Add new
app.get('/add',(req,res) => {
        res.render('user_add',{
            title: 'CRUD Operation in node js Add'          
        });   
});

//save posted data
app.post('/save',(req,res) => {
let data = {name:req.body.name,email:req.body.email,phone_no:req.body.phone_no};
let sql="insert INTO users set ?";
let query = connection.query(sql, data,(err,results)=>  {
    if(err) throw err;
    res.redirect('/');
});
});


//server listining
app.listen(3000,() => {
    console.log('server running at post 3000');
});