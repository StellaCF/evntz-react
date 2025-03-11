import React from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    // reset
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: name,
        createdAt: new Date().toISOString(),
      });
      toast.success("Registration successful");
      // console.log("Navigating to /login...");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to register user, check provided details and try again");
      console.log(error.message);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full h-4/5 max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-cyan-950 mb-4 text-center">Register</h2>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input type="text" 
              id="name" 
              {...register("name", { required: "Name is required"})}
              className="w-full mt-1 p-2  border-e-slate-500 rounded-md shadow-sm outline-none" placeholder="Enter your name" required />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
             className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email" required />
             {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input type="password" id="password" 
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }})}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"placeholder="Enter your password" required />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input type="password" id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
             className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Confirm your password" required />
             {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-cyan-950 text-white py-2 px-4 rounded-md hover:bg-slate-200 hover:text-cyan-950 hover:border-solid hover:border-cyan-950 ">
            Sign Up
          </button>
          <p className="text-center">Already have an account?  <NavLink to="/login">Login</NavLink> </p>
        </form>
      </div>
    </div>
  );
};

export default Register;




