import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Events from './components/Events'
import OnBoard from './OnBoard'
import ProtectedRoute from './ProtectedRoute'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import EventList from './components/dashboardcomponents/EventList'
import Invitees from './components/dashboardcomponents/Invitees'
import UserProfile from './components/dashboardcomponents/UserProfile'
import Create from './components/dashboardcomponents/Create'
import EventDetails from './components/EventDetails'

function App() {

  return (
    <div className='font-poppins'>
     
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={ <OnBoard />} /> 
          <Route path="/events" element={ <Events /> } />
          <Route path="/login" element={ 
            <ProtectedRoute restrictedTo="loggedOut">
              <Login />
            </ProtectedRoute>
             } />
          <Route path="/register" element={ 
            <ProtectedRoute restrictedTo="loggedOut">
              <Register />
            </ProtectedRoute>
           } />
          <Route path="/dashboard" element={ 
            <ProtectedRoute restrictedTo="loggedIn">
              <Dashboard />
            </ProtectedRoute>
           } />
           <Route path="/eventlist" element={ <EventList /> }/>
           <Route path="/invitees"  element={ <Invitees /> }/>
           <Route path="/userprofile" element={ <UserProfile /> }/>
           <Route path="/create" element={ <Create /> }/>
           <Route path="/eventdetails" element={ 
            <ProtectedRoute restrictedTo="loggedIn">
              <EventDetails />
            </ProtectedRoute>
           } />
        </Routes>

      <ToastContainer />
      
    </div>
  )
}


const ConditionalNavbar = () => {
  const location = useLocation();

  // Define the paths where the Navbar should be hidden
  const hideNavbarOnPaths = ["/login", "/register", "/dashboard", "/eventlist", "/invitees", "/userprofile", "/create"];

  // Render Navbar only if the current path is not in the list
  if (hideNavbarOnPaths.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
};
export default App
