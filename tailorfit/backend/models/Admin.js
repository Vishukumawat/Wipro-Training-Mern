
// admin model used from login and authentication

const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,// hashed password

    }
},

    {
        // to automatically manage createdAt and updatedAt fields
        timestamps:true
    }

);
module.exports = mongoose.model.exports = mongoose.model('Admin',adminSchema);