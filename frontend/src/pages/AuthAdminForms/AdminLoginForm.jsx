//start_ui/ux admin login go to dashboard

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added missing import
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';





const AdminLoginForm = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    
    //for pssword The eye that hides
    const [showPassword, setShowPassword] = useState(false);
    //for button submit
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');
    const navigate = useNavigate();
  
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3002/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include'
        });
  
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('token', data.token);
          navigate('/Dashboard/logout');
        } else {
          setError(data.message || 'Login failed');
        }
      } catch (err) {
        setError('Network error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  


  
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          <Link to="/" className="flex justify-center rounded-xl bg-gray-100 border-2  ">
            <span className="text-[60px] text-black font-extrabold">newPC</span>
          </Link>

          <h2 className="mt-32 text-center text-3xl font-extrabold text-gray-900 " >
            Sign in to your Dashboard
          </h2>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">


            <form className="space-y-6" onSubmit={handleSubmit}>

                {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
                )}


              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 flex">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                   <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className=" -ml-8"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                </button>
                </div>
              </div>
  
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
  
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password? 
                  </a>
                </div>
              </div> */}
  
              <div>
                 {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign in
                      </div>
                    )}
                </button>


                {/* <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button> */}
              </div>
            </form>
  


            
          </div>
        </div> 
      </div>
    );




  };
  
  export { AdminLoginForm };