import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${serverUrl}/auth/register`, {
        name: formData.username,
        email: formData.email,
        password: formData.password
      });
      

      setLoading(false);
      if (response.data) {
        navigate('/sign-in');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      setError('Something went wrong!');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-[#0186da]'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-gray-900'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg text-gray-800 flex-grow px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg text-gray-800 flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg text-gray-800 flex-grow px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Confirm Password'
          id='confirmPassword'
          className='bg-slate-100 p-3 rounded-lg text-gray-800 flex-grow px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className='bg-[#0186da]  text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-gray-600'>Have an account?</p> 
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-700 mt-5'>{error}</p>}
    </div>
  );
}

