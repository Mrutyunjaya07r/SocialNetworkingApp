let mongoose=require('mongoose')
let {ObjectId}=mongoose.Schema.Types

let userSchema=new mongoose.Schema({
    fullname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    followers:[{type:ObjectId,ref:"USER"}],
    following:[{type:ObjectId,ref:"USER"}],
})

mongoose.model("USER",userSchema)