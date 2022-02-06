const mongoose = require('mongoose');
const movieModel = {
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    bYear:{
        type:Number,
        validate:{
            validator: Number.isInteger,
            message: "Year must be integer only",
            required: true
        }
    },
    actors:[{
        type: mongoose.Schema.ObjectId,
        ref:'Actor',
        get: ()=>{return name}
    }]
}

const movieSchema = new mongoose.Schema(movieModel);
module.exports = mongoose.model('Movie',movieSchema);