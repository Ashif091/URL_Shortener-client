import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import {  toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState }from '../redux/store'; 
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { loading, error ,errorMsg} = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await axios.post(`${serverUrl}/auth/login`,{
        email:formData.email,
        password:formData.password
      },{withCredentials:true});
      const data = response.data;
      console.log("🚀 ~ handleSubmit ~ data:", data)
      
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      toast.success(data.message)
      dispatch(signInSuccess(data.user));
      navigate('/shortener');
    } catch (error:any) {
      dispatch(signInFailure(error.response?.data || error));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-[#0186da]'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-gray-900'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg text-gray-800 flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg text-gray-800 flex-grow px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-[#0186da]  text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-gray-600'>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? errorMsg.message || 'Something went wrong!' : ''}
      </p>
    </div>
  );
}
