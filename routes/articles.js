const express=require("express");
const Blog = require("../models/blog");
const router=express.Router();

router.get("/new",(req,res)=>{
    if(!req.isAuthenticated()){
      req.flash("error","You must be logged in ")
       res.redirect("/login");
    }
    res.render("new.ejs");
});

router.route("/")
.get(async(req,res)=>{
    let blogs= await Blog.find({});
     res.render("index.ejs",{blogs});
 })
 .post(async(req,res)=>{
    const newBlog=new Blog(req.body.blog);
    await newBlog.save()
    req.flash("success","new blog created");
     res.redirect("/blogs");
 });

router.get("/:id/edit",
    
    async(req,res)=>{
        if(!req.isAuthenticated()){
            req.flash("error","You must be logged in ")
            res.redirect("/login");
                }
    let {id}=req.params;
    let blog=await Blog.findById(id);
    if(!blog){
        req.flash("error","Blog you requested for does not exists ")
        res.redirect("/blogs");
    }
    res.render("edit.ejs",{blog});
});

router.route("/:id")
.get(async(req,res)=>{
    let {id}=req.params;
    const blog=await Blog.findById(id);
    if(!blog){
        req.flash("error","Blog you requested for does not exists ")
        res.redirect("/blogs");
    }
    res.render("show.ejs",{blog});
})
.patch(async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in ")
        res.redirect("/login");
            }
    let {id}=req.params;
    
    let blog=await Blog.findByIdAndUpdate(id,{...req.body.blog},{new:true});
  await blog.save()
   console.log(blog);
   
req.flash("success","Blog Updated ")
   res.redirect(`/blogs/${id}`);
 
})
.delete(async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in ")
        res.redirect("/login");
            }
    let {id}=req.params;
    const deletedBlog=await Blog.findByIdAndDelete(id);
    console.log(deletedBlog);
    req.flash("success","Blog Deleted")
    res.redirect("/blogs");
})




module.exports=router;