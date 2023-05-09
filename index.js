const express=require('express')
const  cors=require('cors');
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const crudroutes=require('./Crudrouter')
const body=require('body-parser')

dotenv.config();

const app=express()

app.use(body.json())

app.use(cors({origin:"*"}))

mongoose.connect("mongodb+srv://vigneshraaj19:Vignesh806@cluster0.3vnatjr.mongodb.net/")
.then(()=>console.log("Mongodb connected"))
.catch((err)=>
console.log(err))

app.use("/crud",crudroutes)

app.use("/abc",async(req,res)=>{
    res.send({message:"App works Successfully"})
})

app.listen(7000,()=>{
    console.log(`server connected `)
})