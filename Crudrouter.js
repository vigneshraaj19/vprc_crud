const { default: mongoose } = require("mongoose")
const {User}=require("./Userschema")
const Router=require('express').Router()
const multer = require('multer')
const  uuidv4 = require('uuid')
const path = require("path");

const storage = multer.diskStorage({
   destination: "./uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");

Router.post("/upload", async(req,res)=>{
   upload(req, res, (err) => {
      console.log("Request file ---", req.file.path);//Here you get file.
      /*Now do where ever you want to do*/
      if(!err)
         return res.send(200).end();
   });
});

Router.get("/getdata",async(req,res)=>{
    try{
        const result=await User.find({})
        res.status(200).send({data:result});  
    }
    catch(err){
        res.status(400).send({message:err});
    }
})


Router.post("/createdata",async(req,res)=>{
    try{
        const data=req.body;
        console.log(req.body)
    
    const emailExist=await User.findOne({email:req.body.email})
    
    if(emailExist)
    {
        res.status(400).send({message:"Given emailid already exist"})
    }
     const user=new User({
        name:data.name,
        email:data.email,
        phone:data.phone,
        role:data.role,
     }).save()
     res.status(200).send({message:"User created successfully"});
    }
    catch(err){
        res.status(400).send({message:err});
    }

})

Router.delete("/deletedata/:_id",async(req,res)=>{
    try{

   const id=req.params._id
   console.log(id)

   const o_id=new mongoose.Types.ObjectId(id)
   console.log(o_id)

   const result=await User.deleteOne({_id:o_id});

   res.status(200).send({message:"User deleted successfully"});
    }
    catch(err){
        res.status(400).send({message:err});
    }
   
})


Router.get("/updatedata/:_id",async(req,res)=>{

    try{

    const id=req.params._id;
    const o_id=new mongoose.Types.ObjectId(id)
    console.log(o_id)
    const updatedata=await User.findOne({_id:o_id})
    console.log(updatedata)
    res.status(200).send({data:updatedata});
    }
    catch(err){
        res.status(400).send({message:err})
    }
    
})

Router.put("/update",async(req,res)=>{

    try{
        const o_id=new mongoose.Types.ObjectId(req.body._id)
        console.log(o_id)
        console.log(req.body)
        const result=await User.updateOne({_id:o_id},{$set:{
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
            phone:req.body.phone,
    
        }})
        res.status(200).send({message:"updated successfully",status:true});
        }
        catch(err){
            res.status(400).send({message:err})
        }
    
})


module.exports=Router



