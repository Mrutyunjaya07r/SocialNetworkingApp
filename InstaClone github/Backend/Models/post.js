let mongoose=require('mongoose')
let {ObjectId}=mongoose.Schema.Types

let postSchema=new mongoose.Schema({
    caption:{type:String,required:true},
    photo:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()},
    likes:[{type:ObjectId,ref:"USER"}],
    postedBy:{type:ObjectId,ref:"USER"}
})

mongoose.model("POST",postSchema)