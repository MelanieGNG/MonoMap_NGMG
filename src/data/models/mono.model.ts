import mongoose from "mongoose";

const monoSchema = new mongoose.Schema({
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        required: true
    },
    isSent:{
        type: Boolean,
        default: false
    },
    genre:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    creationDate:{
        type: Date,
        required: true
    },
  
});



export const MonoModel = mongoose.model("MonoCase", monoSchema)