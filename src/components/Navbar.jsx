import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="w-full h-24 bg-cyan-950 ">
      <nav className='w-4/5 h-full mx-auto flex justify-between items-center text-white'>
         <Link to="">EVNTZ</Link>
         <ul className="flex items-center gap-x-5 text-l">
            <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="/">Home</NavLink></li>
            <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="events">Events</NavLink></li>

            <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="login">Login</NavLink></li>
            <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="register">Sign up</NavLink></li>

            <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="dashboard">Dashboard</NavLink></li>
            <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="logout"> Log Out</NavLink></li>
         </ul>
      </nav>
    </div>
  )
}

export default Navbar
