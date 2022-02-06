const mongoose = require('mongoose');

const actorModel = {
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    bYear: {
        type:Number,
        required:true,
        validate:{
            validator: Number.isInteger,
            message: "Birth year should be integer"
        }
    },
    movie:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
};

const actorSchema = mongoose.Schema(actorModel);
module.exports = mongoose.model('Actor',actorSchema);