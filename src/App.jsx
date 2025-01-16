import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import Logout from './components/Logout'
import Navbar from './components/Navbar'
import Events from './events/Events'
import OnBoard from './OnBoard'

function App() {

  return (
    <div className='font-poppins'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ <OnBoard /> } />
          <Route path="events" element={ <Events /> } />
          <Route path="login" element={ <Login /> } />
          <Route path="register" element={ <Register /> } />
          <Route path="dashboard" element={ <Dashboard /> } />
          <Route path="logout" element={ <Logout /> } />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
