let express=require('express')
let cors=require('cors')
let app=express()
app.use(express.json())
app.use(cors())
let mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1/socialnetworking")
.then(()=>{console.log("connected to database")})
.catch((err)=>{console.log("not connected ",err)})

require('./Models/model')
require('./Models/post')

app.use(require('./Router/routes'))

app.get("/",(req,res)=>{
    res.send("hello")
})

let port=process.env.PORT||3000
app.listen(port,()=>{console.log(`App is running at ${port}`)})