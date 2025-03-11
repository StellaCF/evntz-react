import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children, restrictedTo}) => {
    const {user} = useAuth()

   //  if(loading){
   //      return <p>Loading...</p>
   //  }

    if(restrictedTo === "loggedOut" && user){
        return <Navigate to="/" />
    }

    if(restrictedTo === "loggedIn" && !user){
        return <Navigate to="/login" />
    }

    return children
 
}

export default ProtectedRoute