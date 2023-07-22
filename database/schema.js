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
    },
    login_id:{
        required:true,
        type:String
    }
})

module.exports=mongoose.model('users',user_schema);