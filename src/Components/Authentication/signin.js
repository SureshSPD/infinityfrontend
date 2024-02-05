import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from "../assests/INFINITY COLOR LAB LOGO 8.png"
import { Slidecontext } from '../Context/slidercontext';

function Login() {
  const history = useNavigate();

  const [SignData, setSignData] = useState({
    email: '',
    password:''
  });

  
  const {EmailId, setEmailId, userRole, setUserRole}= useContext(Slidecontext)
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // 'http://127.0.0.1:5000/users/signin',
        "https://backendinfinity-8b393b9bf8e9.herokuapp.com/users/signin",
        SignData,
        {
          headers: {
            'Content-Type': 'application/json', // Adjust the content type based on your server requirements
            // You can add other headers as needed
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          },
        }
      );
          
      // Reset the form data after successful submission
      setSignData({
        email: '',
        password: '',
      });
  
      // Check if the authentication was successful before navigating
      if (response.status === 200) {
        // Navigate to the home page
        console.log("SignData.email",SignData.email)
        setEmailId(sessionStorage.setItem("Emailid", SignData.email))
        setUserRole(sessionStorage.setItem("UserRole",response.data.user.accessRole))
        setEmailId(SignData.email);
        history("/Home");
      } else {
        // Handle other response statuses or error messages as needed
        console.error('Authentication failed:', response.data.message);
      }
        // Display a user-friendly error message
        if (response.status === 401) {
          // Unauthorized (wrong credentials)
          console.error('Invalid email or password');
        } else {
          // Other errors
          console.error('Unexpected error occurred. Please try again later.');
        }
    } catch (error) {
      console.error('Error in submitting order details:', error);
    }
  };
  
    return (
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-1/4">
        <div className="flex flex-row items-center justify-center"
        >
              <a>
              <img
            className="flex justify-center items-center w-40 h-18"
            src={logo}
            alt="Infinity"
          />
              </a>

        </div>
          <form className="space-y-6 " action="#" method="POST" onSubmit={handleSubmit} >
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Email id" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                  required
                  value={SignData.email}  // Set initial value
                  
                  onChange={(e) => setSignData({ ...SignData, email: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                </div>
              </div>
               
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={SignData.password}  // Set initial value
                  onChange={(e) => setSignData({ ...SignData, password: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      );
}

export default Login;