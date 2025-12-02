// customer  measurement schema


const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
// all measurements are in centimeters
Chest :Number,
Waist :Number,
Hips :Number,
Shoulder :Number,
Sleeve :Number,
armLength :Number,
Neck :Number,
legLength :Number
    },

{
    _id:false
}
);
const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    measurements:measurementSchema,
    notes:{
        type :String,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
    }

);
module.exports = mongoose.model('Customer',customerSchema);
