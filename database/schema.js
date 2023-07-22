const mongoose = require('mongoose');

const user_schema=mongoose.Schema({
    Name:{
        required:true,
        type:String
    },
    Image:{
        required:true,
        type:String
    },
    email_verified:{
        required:true,
        type:Boolean
    }
})

module.exports=mongoose.model('users',user_schema);