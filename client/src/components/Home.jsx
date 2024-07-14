import React, { useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'

const Home = () => {
  
  return (
    <div className='hero'>
      <div className='hero-content'>
        <h1 className='hero-text'>Book Shop</h1>
        <p className='hero-description'>
          Welcome to the official Bookstore Management system of our Institute. We are committed to deliver hassle-free reader experience for searching books available with us.
        </p>
      </div>
      <div className='hero-image'>
      </div>
    </div>
  )
}

export default Home
