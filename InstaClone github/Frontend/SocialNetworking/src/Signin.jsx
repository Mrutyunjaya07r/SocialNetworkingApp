import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Signin() {
  let navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const postData=()=>{
     fetch("http://localhost:3000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then((data)=>{
      console.log(data)
      localStorage.setItem("socialnetworking",data)
      console.log("signin sucessfully")
      alert(`${email} signin successfully`)
      navigate('/')
    })
  }
  return (
    <div>
      <h1>SignIn</h1>
      <div className="con">
        <div className="formin">
          <input type="text" name="email" id="email"  placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" name="password" id="password" placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          <input type="submit" value="Submit" onClick={postData} style={{backgroundColor:"chartreuse",border:"0.5px solid black",color:"black"}} />
        </div>
      </div>
    </div>
  )
}

export default Signin