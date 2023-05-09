const mongoose=require('mongoose');

const Userschema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    role:{type:String,required:true},
    image: {
        type: String
    }
})

const User=mongoose.model('user',Userschema);
module.exports = {User}