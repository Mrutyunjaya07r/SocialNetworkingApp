import React from 'react'
import { Link , useNavigate } from 'react-router-dom'

function Navbar() {
  let navigate=useNavigate()
  const logOut=()=>{
    localStorage.removeItem('socialnetworking')
    navigate('/signin')
  }

  return (
    <div>
      <nav>
        <img src="logo.png" alt="" className="logoapp" />
        <ul>
          <li><span className="material-symbols-outlined">home</span><Link to='/'>Home</Link></li>
          <li><span className="material-symbols-outlined">upload</span><Link to='/createpost'>Create Post</Link></li>
          <li><span className="material-symbols-outlined">person</span><Link to='/profile'>Profile</Link></li>
          <li><span className="material-symbols-outlined">login</span><Link to='/signup'>Signup</Link></li>
          <li><span className="material-symbols-outlined">login</span><Link to='/signin'>Signin</Link></li>
          <button onClick={logOut}  style={{color:"red"}}>LogOut</button>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar