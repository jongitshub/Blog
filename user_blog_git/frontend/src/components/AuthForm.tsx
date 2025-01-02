import React, { useState } from 'react';  
import axios from 'axios';  

const AuthForm: React.FC = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [isLogin, setIsLogin] = useState(true);  
  const [error, setError] = useState<string | null>(null);  // Error state  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    const endpoint = isLogin ? '/login' : '/register';  

    try {  
      const { data } = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {  
        email,  
        password,  
      });  
      localStorage.setItem('token', data.token);  
      window.location.href = '/dashboard';  
    } catch (error) {  
      if (axios.isAxiosError(error)) {  
        console.error('Authentication failed:', error.response ? error.response.data : error.message);  
        setError(error.response?.data?.message || 'Authentication failed');  // Set error state  
      } else {  
        console.error('Unexpected error:', error);  
        setError('Something went wrong.');  
      }  
    }  
  };  

  return (  
    <div className="flex items-center justify-center h-screen">  
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">  
        <h2 className="text-2xl mb-6">{isLogin ? 'Login' : 'Register'}</h2>  
        
        {error && (  
          <div className="text-red-500 mb-4">  
            {error}  
          </div>  
        )}  
        
        <div className="mb-4">  
          <label className="block text-gray-700">Email</label>  
          <input  
            type="email"  
            value={email}  
            onChange={(e) => setEmail(e.target.value)}  
            className="w-full p-2 border rounded mt-1"  
            required  
          />  
        </div>  

        <div className="mb-6">  
          <label className="block text-gray-700">Password</label>  
          <input  
            type="password"  
            value={password}  
            onChange={(e) => setPassword(e.target.value)}  
            className="w-full p-2 border rounded mt-1"  
            required  
          />  
        </div>  

        <button  
          type="submit"  
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"  
        >  
          {isLogin ? 'Login' : 'Register'}  
        </button>  

        <div className="mt-4 text-center">  
          <button  
            type="button"  
            onClick={() => setIsLogin(!isLogin)}  
            className="text-blue-500 hover:underline"  
          >  
            {isLogin ? 'Need to register?' : 'Already have an account?'}  
          </button>  
        </div>  
      </form>  
    </div>  
  );  
};  

export default AuthForm;  
