import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  let navigate=useNavigate()
  const [fullname,setFullname]=useState("")
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const postData=async()=>{
    let result=await fetch("http://localhost:3000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        fullname:fullname,
        username:username,
        email:email,
        password:password
      })
    })
    result=await result.json()
    console.log(result)
    alert(`${fullname} Signup successfully`)
    navigate('/signin')
  }
  return (
    <div>
      <h1>Signup</h1>
      <div className="con">
        <div className="form">
          <input type="text" name="fullname" id="fullname" placeholder='Enter Fullname' value={fullname} onChange={(e)=>{setFullname(e.target.value)}} />
          <input type="text" name="Username" id="Username" placeholder='Enter Username' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
          <input type="text" name="email" id="email"  placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" name="password" id="password" placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          <input type="submit" value="Submit" onClick={postData} style={{backgroundColor:"chartreuse",border:"0.5px solid black",color:"black"}} />
        </div>
      </div>
    </div>
  )
}

export default Signup