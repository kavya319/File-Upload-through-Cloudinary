const mongoose = require('mongoose');
const { image } = require('../config/cloudinary');
const fileSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },  
    ImageUrl:{
        type:String,
},
tags:{
    type:[String],
  },
  email:{
    type:String,
  }
}
);

const File = mongoose.model("File",fileSchema);
module.exports = File;
