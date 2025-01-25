import React from 'react'
import { useNavigate } from 'react-router-dom'
import './forget.css'

function forget() {
    const navigate = useNavigate()
  return (
    <div class="center-container">
    <div>
      <p>Page under construction</p>
      <button onClick={() => navigate('/login')}>Go to login</button>
    </div>
  </div>
  
  )
}

export default forget
