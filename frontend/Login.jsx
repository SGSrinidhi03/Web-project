
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import "./Signup.css";
import { useAuth } from "../context/ContextProvider";
import axios from 'axios'
import { toast } from 'react-toastify';  
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
const Login =() => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {login} = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response= await axios.post('http://localhost:5000/api/auth/login',
          { email,password });
          if(response.data.success) {
            login(response.data.user)
            localStorage.setItem("token", response.data.token)
            
            toast.success("Login successful!");

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error("Invalid credentials, please try again.");
            }
            
          
    } catch (error) {
          console.log(error)
          toast.error("Login failed. Please check your email or password.");
        }
    }
    
    return (
    <div className="signup-container">
    <ToastContainer />

    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}
                placeholder='*****'required/>
            </div>
            <div>
                <button type="submit">Login</button>
            <p>Don't have an account?<Link to="/register">Register</Link></p>
            </div>
            
        </form>
    </div>
    </div>

    
 )
}
export default Login