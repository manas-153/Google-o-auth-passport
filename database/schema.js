const mongoose = require('mongoose');

const user_schema=mongoose.Schema({
     googleId:{
          required:true,
          type:String
     },
     profileImage:{
          required:false,
          type:String
     },

     displayName:{
          required:true,
          type:String
     },
     email: 
     {
          required:true,
          type:String
     },
     cartProducts:{
          required:false,
          type:Array,
     },
     favourites:{
             required:false,
             type:Array,    
     },
     orders:{
          required:false,
          type:Array
     },
     accessToken:{
          required:true,
          type:String
     },
     refreshToken:{
          required:false,
          type:String
     }
});

module.exports=mongoose.model('users',user_schema);