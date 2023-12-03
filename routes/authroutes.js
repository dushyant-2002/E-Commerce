const express=require('express');
const User=require('../models/User');
const passport=require('passport');
const router=express.Router();

//sign up form
router.get('/register',(req,res)=>{
    res.render('./auth/signup');
});

//storing user data on sigun form in db
router.post('/register',async(req,res)=>{
    let {username, email,password,name,age}=req.body;
    let newuser=new User({username, email,name,age});
    let welcome=await User.register(newuser,password);
    res.send(welcome);
})

//login form
router.get('/login',(req,res)=>{
    res.render('./auth/login');
})

//final authentication on login
router.post('/login',
passport.authenticate('local',{failureRedirect:'/login'}),
function(req,res){
    console.log(req.user , "new");//req.user humko sari attrinutes dega db ka
    res.redirect('/products');
})

module.exports=router;


//methods directly applied on schema.models are called as static methods