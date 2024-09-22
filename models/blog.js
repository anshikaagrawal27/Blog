const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const blogSchema=new Schema({
title:{
    type:String,
    required:true
},
content:{
    type:String,
    required:true
},
author:{
    type:String,
    required:true
},
phoneNumber:{
    type:Number,
},
createdAt:{
    type:Date,
    default:Date.now
},

});

const Blog=mongoose.model("Blog",blogSchema);
module.exports=Blog;
