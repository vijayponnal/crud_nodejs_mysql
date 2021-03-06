require("dotenv").config();
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
        host:process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Db connected succesfully ');
});

//use for bootstrap files in views .ejs files
app.use(express.static(path.join(__dirname, 'public')));

//set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//list users
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

//Add new user form render
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

//Edit Users
app.get('/edit/:userId',(req,res) => {
const userId = req.params.userId;
let sql ='select * from users where id = ?';
let query = connection.query(sql,[userId],(err,results) =>{
    if(err) throw err;
    res.render('user_edit',{
        title: 'Edit operation',
        user : results[0]
    })
})
});


//update
app.post('/update',(req,res) => {
const userId = req.body.id;
let sql='UPDATE users set name=?, email=?,phone_no=? where id=?';
let query = connection.query(sql,[req.body.name,req.body.email,req.body.phone_no,userId],(err,results)=>  {
    if(err) throw err;
    res.redirect('/');
});
});

//Delete Users
app.get('/delete/:userId',(req,res) => {
const userId = req.params.userId;
let sql ='Delete from users where id = ?';
let query = connection.query(sql,[userId],(err,results) =>{
    if(err) throw err;
    res.redirect('/');
});
});

//server listining
app.listen(3000,() => {
    console.log('server running at post 3000');
});