import React from 'react'
import logo from "../Calori.png"
import "./HomePage.css"
import background from './Back.png'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
     const navigate = useNavigate()

const HandleLogin =() =>{
     navigate("/login")
}

  return (
    <>
            <div className='H-main'>
    
                   {/* Navbar */}

                   <div className='H-logo'>
                        <img src={logo} alt='logo'/>
                   </div>

                        {/* Herosection */}

                   <div className='H-Hero'>

                        <div className='H-leftSection'>
                        <h1>Mindful  <strong> eating</strong>, powerful living.</h1>
                        <p>Discover the transformative power of mindful eating and unlock a healthier, happier you.</p>
                                <button  onClick={HandleLogin}>  Start Now  </button>
                        </div>

                       
                   </div>

            </div>
    </>
  )
}

export default HomePage