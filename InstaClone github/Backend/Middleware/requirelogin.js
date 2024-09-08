let jwt=require('jsonwebtoken')
let {Jwt_secret}=require('../key')
let mongoose=require('mongoose')
let USER=mongoose.model("USER")



module.exports=(req,res,next)=>{
    console.log("hello from middleware")
    const {authorization}=req.headers
    if(!authorization){
        return res.status(404).send("you must Login 1")
    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,Jwt_secret,(err,payload)=>{
        if(err){
            return res.status(404).send("you must login 2")
        }
        let {_id}=payload
        USER.findById(_id).then((userData)=>{
            console.log(userData)
            req.user=userData
            next()
        })
    })
}