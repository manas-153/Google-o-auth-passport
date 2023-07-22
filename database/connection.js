const mongoose = require('mongoose');

const conn = async(req,res)=>
{
    await mongoose.connect('mongodb://localhost:27017/google-o-auth').then(res=>
    {
        console.log("Database connected successfully")
    }).catch(err=>
        {
         console.log(err.message);
        })
  
}

module.exports=conn;