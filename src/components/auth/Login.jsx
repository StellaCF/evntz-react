import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      setError("Please fill out all fields")
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    setError("Invalid email format");
    return;
  }

    try{
      await signInWithEmailAndPassword(auth,email,password)
      toast.success("Login successful");
      navigate('/dashboard')
    }catch (error){
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error("Error during login:", error.message);
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h2>
        <form action="" onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" required />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password" required />
          </div>
          {error && <p className='text-red-500'>{error}</p> }
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-950 text-white py-2 px-4 rounded-md hover:bg-slate-200 hover:text-cyan-950 hover:border-solid hover:border-cyan-950 ">
            Login
          </button>
          <p className="text-center">New to EVNTZ?  <NavLink className={`text-cyan-950`} to="/register">Register</NavLink> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

