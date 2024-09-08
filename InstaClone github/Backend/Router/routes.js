let express=require('express')
let router=express.Router()
let mongoose=require('mongoose')
let USER=mongoose.model("USER")
let POST=mongoose.model("POST")
let jwt=require('jsonwebtoken')
let {Jwt_secret}=require('../key')
const requirelogin = require('../Middleware/requirelogin')

router.get("/",(req,res)=>{
    res.send("hello from router")
})
router.get("/addpost",requirelogin,(req,res)=>{
    console.log("hello from router")
})
router.post("/signup",(req,res)=>{
    const {fullname,username,email,password}=req.body
    if(!fullname||!username||!email||!password){
        return res.status(404).send("fill all the feilds")
    }
    let user=new USER({
        fullname,
        username,
        password,
        email
    })
    let result=user.save()
    console.log(result)
    res.send(result)
})
router.post("/signin",(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(404).send("fill all the feilds")
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send("not sugnup")
        }
        console.log(savedUser)
    })
    USER.findOne({password:password}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send("not sugnup")
        }
        console.log(savedUser)
        const token=jwt.sign({_id:savedUser.id},Jwt_secret)
        console.log(token)
        res.json(token)
    })
})
router.post("/createpost",requirelogin,(req,res)=>{
    const {caption,pic}=req.body
    if(!caption||!pic){
        return res.status(404).send("fill all the feilds")
    }
    req.user
    let post=new POST({
        caption:caption,
        photo:pic,
        postedBy:req.user
    })
    let result=post.save()
    console.log(result)
    res.send(result)
})
router.get("/showposts",(req,res)=>{
     POST.find()
     .populate("postedBy")
     .then((data)=>{console.log(data);res.send(data)})
     .catch((err)=>{console.log(err)})
})
router.get("/myposts",requirelogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy")
    .then((result)=>{console.log(result);res.send(result)})
    .catch((err)=>{console.log(err)})
})
router.delete("/deletepost",async(req,res)=>{
    let result= await POST.findByIdAndDelete({_id:req.body.id})
    if(!result){
        return res.status(404).send("not deleted")
    }
    console.log(result)
    res.send(result)
})
router.get("/userprofile/:id",async(req,res)=>{
    try {
        let user=await USER.findOne({_id:req.params.id}).select("-password")
        if(!user){
            res.status(404).send("not got user")
        }
        let posts=await POST.find({postedBy:req.params.id}).populate("postedBy","_id fullname username")
        res.status(200).json({user,posts})
    } catch (error) {
        console.log(error)
    }
})
router.put("/follow",requirelogin,async(req,res)=>{
    try {
        let update_user=await USER.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.user._id}
        },{
            new:true
        })
        if(!update_user){
            res.status(404).send("not follwers")
        }
        let current_user=await USER.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        })
        if(!current_user){
            res.status(404).send("not follwers")
        }
        console.log(current_user)
        res.send(current_user)
    } catch (error) {
        console.log(error)
    }
})
router.put("/unfollow",requirelogin,async(req,res)=>{
    try {
        let update_user=await USER.findByIdAndUpdate(req.body.followId,{
            $pull:{followers:req.user._id}
        },{
            new:true
        })
        if(!update_user){
            res.status(404).send("not follwers")
        }
        let current_user=await USER.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}
        },{
            new:true
        })
        if(!current_user){
            res.status(404).send("not follwers")
        }
        console.log(current_user)
        res.send(current_user)
    } catch (error) {
        console.log(error)
    }
})
router.put("/like",requirelogin,async(req,res)=>{
    try {
        let like=await POST.findByIdAndUpdate(req.body.postId,{
            $push:{likes:req.user._id}
        },{
            new:true
        })
        if(!like){
            return res.status(404).send("not like")
        }
        res.send(like)
    } catch (error) {
        console.log(error)
    }
})
router.put("/unlike",requirelogin,async(req,res)=>{
    try {
        let unlike=await POST.findByIdAndUpdate(req.body.postId,{
            $pull:{likes:req.user._id}
        },{
            new:true
        })
        if(!unlike){
            return res.status(404).send("not like")
        }
        res.send(unlike)
    } catch (error) {
        console.log(error)
    }
})

module.exports=router