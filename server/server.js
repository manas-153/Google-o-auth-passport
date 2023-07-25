const express=require('express');
const path=require('path');
const passport=require('passport');
const session = require('express-session');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const https=require('https');
const fs=require('fs');

require('../auth/auth');
require('dotenv').config();

const app=express();
const bodyParser=require('body-parser');
const conn = require('../database/connection');
 
const PORT= process.env.PORT;



// Middlewares 

app.set('views', path.join(__dirname, '../' , 'views'));
app.set('view engine', 'ejs');

function isLoogedIn(req,res,next)
{
    req.user ? next() : res.send({
        status:"failed",
        msg:"Please Login with your valid account to access this page",
    })
}

app.use(cookieParser());

app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false},
}))

app.use(passport.session());



// Routing 

app.get("/",(req,res)=>
{
    // console.log();
    console.log(res.cookie("connect.sid"));
    res.render('login');
})


app.get('/auth/google', (req,res)=>
{
    res.json("hello");
});

app.get('/logout',(req,res)=>
{

    req.session.destroy((e)=>{
        req.logout((err)=>
        {
            // console.log(err);
            // res.redirect('https://accounts.google.com/logout');
        });
    });
})
   

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

// Gives success message 
app.get('/auth/google/success',isLoogedIn,(req,res)=>
{
    // console.log(req.user);
    res.render('user_dashboard',{user:req.user});
});

// Gives error message 
app.get("/auth/google/failure",(req,res)=>
{
    res.send("Error 404, Unable to login with your valid google account");
});

// Listening server 
app.listen(PORT,()=>
{
    console.log(`Your server is listening on ${PORT} port`);
    conn();
})

