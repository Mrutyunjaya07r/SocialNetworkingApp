import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Createpost() {
  let navigate=useNavigate()
  const [caption,setCaption]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")
  useEffect(()=>{
    if(url){
      fetch("http://localhost:3000/createpost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("socialnetworking")
        },
        body:JSON.stringify({
          caption:caption,
          pic:url
        })
      }).then((res)=>res.json())
      .then((data)=>{console.log(data)})
      .catch((err)=>{console.log(err)})
      navigate('/')
    }
   
  },[url])
  const postDetail=()=>{
    console.log(caption,image)
    let data=new FormData()
    data.append("file",image)
    data.append("upload_preset","SocialnetworkingApp")
    data.append("cloud_name","mrutyunjayacloud")
    fetch("https://api.cloudinary.com/v1_1/mrutyunjayacloud/image/upload",{
      method:"post",
      body:data
    }).then((res)=>res.json())
    .then((data)=>setUrl(data.url))
    .catch((err)=>{console.log(err)})
  }
  var loadFile = (event)=> {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };
  return (
    <div>
      <h1>Add Your Post</h1>
      <pre>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"30px"}}>
        <img src="" alt="" style={{height:"300px",width:"300px",border:"1px solid white"}} id="output" />
      <input type="file" name="file" id="file" accept="image/*" onChange={(event)=>{loadFile(event); setImage(event.target.files[0])}} />
      <button onClick={()=>{postDetail()}}>Share</button>
        </div>
        <hr />
      <div style={{textAlign:"center"}}>
      <h1>Write your caption</h1>
      <textarea name="caption" id="caption" value={caption} onChange={(e)=>{setCaption(e.target.value)}} placeholder='Enter the Caption' style={{height:"100px",width:"400px",marginTop:"20px"}} ></textarea>
      </div>
      
      </pre>

    </div>
  )
}

export default Createpost