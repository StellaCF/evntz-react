import React, {useState} from 'react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { toast } from "react-toastify"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import logo from '../assets/logo.webp'


const Navbar = () => {
  const navigate = useNavigate();
  const {user, userDetails} = useAuth() || {};
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
      console.log(error);
    }
  };

  const displayCreate = () => {
    navigate("/create")
  }

  if (isOpen) {
    document.body.style.overflow = "hidden"; // Disable scrolling
  } else {
    document.body.style.overflow = "auto"; // Enable scrolling
  }

  return (
    <div className="w-full h-24 bg-cyan-950 ">
      <nav className='w-4/5 h-full mx-auto flex justify-between items-center text-white'>
         <Link to="/" className='flex items-center gap-1 font-extrabold text-2xl font-playfair'> <img className='w-[30px] h-[20px] rounded object-cover' src={logo} alt="" /> EVNTZ</Link>
         {/* <div>
          <input type="search" placeholder='Search event name or category' className=' rounded-full px-3 py-1 outline-none text-black lg: w-[400px] md: w-[200px] ' />
          </div>  */}
         <button 
          className="md:hidden text-white" 
          onClick={() => setIsOpen(!isOpen)}
          >
          {isOpen ? <XMarkIcon className='size-10' /> : <Bars3Icon className='size-10' />}
          </button>
          
         <ul className="hidden md:flex items-center gap-x-5 text-l">
            {/* <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="/">Home</NavLink></li> */}
            <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="events">Explore</NavLink></li>
            {!user ? (
              <>
                <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="login">Login</NavLink></li>
                <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="register">Sign up</NavLink></li>
              </>
            ) : (
              <>
                <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="dashboard">Dashboard</NavLink></li>
                <button className="" onClick={handleLogout}>Logout</button>
                <button className="bg-[#eb0d66] rounded-full px-5 py-2 text-white" onClick={displayCreate}>Create Event</button>
              </>
            )}
         </ul>
      </nav>

      {/* mobile navbar */}
      {isOpen && (
        <ul className="absolute z-50 top-24 left-0 w-full h-full text-white bg-cyan-950 flex flex-col items-center py-5 gap-4 md:hidden transition-all duration-300">
          <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="events" onClick={() => setIsOpen(false)}>Explore</NavLink></li>
          {!user ? (
            <>
              <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="login" onClick={() => setIsOpen(false)}>Login</NavLink></li>
              <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="register" onClick={() => setIsOpen(false)}>Sign up</NavLink></li>
            </>
          ) : (
            <>
              <li className="hover:text-pink-500 active:text-pink-700"><NavLink to="dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavLink></li>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="hover:text-pink-500">Logout</button>
              <button className="bg-[#eb0d66] rounded-full px-5 py-2 text-white" onClick={() => { displayCreate(); setIsOpen(false); }}>Create Event</button>
            </>
          )}
        </ul>
      )}
    </div>
  )
}

export default Navbar
