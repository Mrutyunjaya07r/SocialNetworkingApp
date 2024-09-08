import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Createpost from './Createpost'
import Signup from './Signup'
import Signin from './Signin'
import Home from './Home'
import Profile from './Profile'
import Userprofile from './Userprofile'

function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route  path='/createpost' element={<Createpost/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/userprofile/:userid' element={<Userprofile/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
