import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [data,setData]=useState([])
  useEffect(()=>{
    showdata()
  },[])

  const showdata=async()=>{
    let result=await fetch("http://localhost:3000/showposts")
    result=await result.json();
    console.log("show all post")
    console.log(result)
    setData(result)
  }

  const likePost=(id)=>{
    fetch("http://localhost:3000/like",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("socialnetworking")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then((result)=>{console.log(result)})
  }
  const unlikePost=(id)=>{
    fetch("http://localhost:3000/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("socialnetworking")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then((result)=>{console.log(result)})
  }
  return (
    <div>
      <div className="box" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className="container">
        {
          data.map((item)=>
               <div className="card" style={{border:"1px solid white", backgroundColor:"black",height:"450px",width:"400px",marginBottom:"20px"}}>
          <div className="headers" style={{border:"1px solid white",display:"flex",alignItems:"center",padding:"10px"}}>
            <img src="https://cdn-icons-png.flaticon.com/512/6997/6997494.png" alt="" style={{height:"40px",width:"40px",borderRadius:"50%"}} className="profilepic" />
            <pre>
            <h2 style={{paddingLeft:"10px"}} ><Link to={`/userprofile/${item.postedBy._id}`} >{item.postedBy.fullname}</Link></h2>
            <h4  style={{paddingLeft:"10px"}}>{item.postedBy.username}</h4>
            </pre>
           
          </div>
          <img src={item.photo} style={{height:"250px",width:"400px"}} alt="" className="postimg" />
          <div className="footer" style={{padding:"10px"}} >
            <button style={{margin:"10px"}} onClick={()=>{likePost(item._id)}}>Like</button>
            <button onClick={()=>{unlikePost(item._id)}}>Unlike</button>
            <p>{item.likes?item.likes.length:"0"} Likes</p>
            <pre><p>Caption:{item.caption}</p></pre>
        </div>
            </div>
           
          )
        }
        </div>
       
      </div>
    </div>
  )
}

export default Home