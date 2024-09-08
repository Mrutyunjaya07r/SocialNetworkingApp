import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

function Userprofile() {
    const {userid}=useParams()
    console.log(userid)
    const [user,setUser]=useState("")
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        showmyPost()
    },[userid])

    const showmyPost=async()=>{
        fetch(`http://localhost:3000/userprofile/${userid}`, {
            headers: {
                "Authorization":"Bearer "+localStorage.getItem("socialnetworking")
            }
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setUser(result.user);
            setPosts(result.posts);
        })
        .catch((err) => {
            console.error(err);
        });
    }
    const followuser=(userId)=>{
        fetch("http://localhost:3000/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("socialnetworking")
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res=>res.json())
        .then((data)=>{console.log(data)})
    }
    const unfollowuser=(userId)=>{
        fetch("http://localhost:3000/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("socialnetworking")
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res=>res.json())
        .then((data)=>{console.log(data)})
    }
 
  return (
    <div>
            {
                posts.map((item)=>
                    <div>
                    <div className="headers" style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"50px"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/6997/6997494.png" style={{height:"160px",width:"160px",marginRight:"60px"}} alt="" className="profilepic" />
                        <pre>
                        <h1>{item.postedBy.fullname}</h1>
                        <h2>{item.postedBy.username}</h2>
                        <button style={{margin:"10px"}} onClick={()=>{followuser(item.postedBy._id)}} >Follow</button>
                        <button style={{margin:"10px"}} onClick={()=>{unfollowuser(item.postedBy._id)}}>Unfollow</button>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <p style={{margin:"10px"}}>{posts.length} Posts</p>
                            <p style={{margin:"10px"}}>{user.followers?user.followers.length:"0"} Followers</p>
                            <p style={{margin:"10px"}}>{user.following?user.following.length:"0"} Following</p>
                        </div>
                        </pre>
                    </div>
                    <hr />
                    <div className="footer" style={{display:"flex",alignItems:"center"}}>
                        <img src={item.photo} alt="" className="postimg" style={{height:"200px",marginLeft:"50px",width:"200px",border:"1px solid white",borderRadius:"5px",marginTop:"30px"}} />
                        <div className="detailpost" style={{height:"100px",width:"400px",margin:"100px",backgroundColor:"yellowgreen",color:"black",borderRadius:"10px"}}>
                            <p>PostedId:{item._id}</p>
                            <p>Posted By:{item.postedBy.fullname}</p>
                            <p>Date of Post:{item.createdAt}</p>
                            <p>Caption:{item.caption}</p>
                        </div>
                    </div>
                        </div>
                )
            }
        </div>
  )
}

export default Userprofile