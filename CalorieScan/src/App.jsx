import { useState } from 'react'
import './App.css'
import Scan from './components/Scan'
import Home from './components/FirstPage/HomePage'
import Login from './components/Authenetication/login'
import Signup from './components/Authenetication/signup'
import Forget from './components/Authenetication/forget'

import { BrowserRouter  ,Routes , Route} from 'react-router-dom'

function App() {

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forget" element={<Forget/>} />
      <Route path="/" element={<Home/>} />
      <Route path="*" element={<Home/>} />
      <Route path="/dishes" element={<Scan/>} />
    </Routes>
   </BrowserRouter>
 
   </>
  )
}

export default App
