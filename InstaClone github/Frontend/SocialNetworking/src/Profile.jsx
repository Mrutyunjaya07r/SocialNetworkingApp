import React, { useEffect, useState } from 'react'

function Profile() {
    const [data,setData]=useState([])
    const [id,setId]=useState("")
    useEffect(()=>{
        showmyPost()
    },[])
    const showmyPost=async()=>{
        let result=await fetch("http://localhost:3000/myposts",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("socialnetworking")
            }
        })
        result=await result.json();
        console.log(result)
        setData(result)
    }
    const deleteData=async()=>{
        let result=await fetch("http://localhost:3000/deletepost",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:id
            })
        })
        result=await result.json()
        console.log(result)
    }
  return (
    <div>
            {
                data.map((item)=>
                    <div>
                    <div className="headers" style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"50px"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/6997/6997494.png" style={{height:"160px",width:"160px",marginRight:"60px"}} alt="" className="profilepic" />
                        <pre>
                        <h1>{item.postedBy.fullname}</h1>
                        <h2>{item.postedBy.username}</h2>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <p style={{margin:"10px"}}>{data.length} Posts</p>
                            <p style={{margin:"10px"}}>{item.postedBy.followers?item.postedBy.followers.length:"0"} Followers</p>
                            <p style={{margin:"10px"}}>{item.postedBy.following?item.postedBy.following.length:"0"} Following</p>
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
                    <div className="delete">
                        <input type="text" name="id" id="id" value={id} onChange={(e)=>{setId(e.target.value)}} placeholder='Enter the id' />
                        <input type="submit" value="Delete" onClick={()=>{deleteData()}} style={{backgroundColor:"red",border:"1px solid black"}} />
                    </div>
                        </div>
                )
            }
        </div>
  )
}

export default Profile