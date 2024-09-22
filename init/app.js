const mongoose=require("mongoose");
let initData=require("./data.js");
const Blog=require("../models/blog.js");

main()
.then(()=>{
    console.log("connencted to be db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogpage');
 }

 const initDB=async()=>{
    await Blog.deleteMany({});
   await Blog.insertMany(initData.data);
   console.log("data was initialized");
 }

 initDB();