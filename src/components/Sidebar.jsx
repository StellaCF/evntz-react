import React from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { useAuth } from '../AuthContext';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { HomeIcon, CalendarDateRangeIcon, TicketIcon, UserCircleIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import logoImg from '../assets/e-logo.png'

const Sidebar = () => {

   const navigate = useNavigate();
   const {user, userDetails} = useAuth() || {};
   if (!user) return <p>Loading...</p>;
 
   const handleLogout = async () => {
     try{
       await signOut(auth);
       toast.success("successfully logged out")
       navigate("/")
     } catch (error) {
       toast.error("failed to log out")
     }
   }
   const displayUserprofile = () => {
     navigate("/userprofile")
   }

   const displayCreate = () => {
      navigate("/create")
    }


  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <div className="w-2/12 h-full py-10"> 
      <div className='flex justify-between items-center mx-5'>
        <Link to="/" className='font-extrabold text-cyan-950 text-2xl font-playfair '>EVNTZ</Link>
      </div>  
      
      <nav className='w-4/5 h-full mx-auto mt-7 flex flex-col justify-between'>
         <ul className='flex flex-col gap-3'>
            <button className="bg-[#eb0d66] rounded px-5 py-2 md:px-2 text-white" onClick={displayCreate}> <span className='inline md:hidden'>+</span> <span className='hidden md:inline'>CREATE EVENT</span> </button>
            <li className='w-full  hover:bg-slate-300 rounded p-2'> <NavLink to="/dashboard" className={({ isActive }) => `flex gap-2 items-center ${isActive ? "text-[#eb0d66] font-bold" : "text-black"}`}> <HomeIcon className="size-6"/> <span className='hidden md:inline'>Home</span> </NavLink></li>
            <li className='w-full flex gap-2 items-center hover:bg-slate-300 rounded p-2'> <NavLink to="/eventlist" className={({ isActive }) => `flex gap-2 items-center ${isActive ? "text-cyan-950 font-bold" : "text-black"}`}> <CalendarDateRangeIcon className='size-6'/> <span className='hidden md:inline'>Events</span> </NavLink></li>
            <li className='w-full flex gap-2 items-center hover:bg-slate-300 rounded p-2'> <NavLink to="/invitees" className={({ isActive }) => `flex gap-2 items-center ${isActive ? "text-cyan-950 font-bold" : "text-black"}`}> <TicketIcon className='size-6'/> <span className='hidden md:inline'>Bookings</span> </NavLink></li>
         </ul>
         <div className='flex flex-col gap-3 items-start pb-10'>
            <button className='w-full flex gap-2 items-center hover:bg-slate-300 rounded p-2 text-left' onClick={displayUserprofile}> <UserCircleIcon className='size-6'/> <span className="hidden md:inline"> {userDetails?.name} </span> </button>
            <button className='w-full flex gap-2 items-center hover:bg-slate-300 rounded p-2 text-left' onClick={handleLogout}> <ArrowLeftStartOnRectangleIcon className='size-6'/> <span className="hidden md:inline">logout</span> </button>
         </div>
      </nav>
    </div>
  )
}

export default Sidebar
