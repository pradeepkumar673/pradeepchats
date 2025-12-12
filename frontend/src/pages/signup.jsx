import React from 'react'
import axios from 'axios'
import { serverurl } from './configs/serverurl'
import light from '../assets/light.svg'
import bg from '../assets/background.jpeg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const signup = () => {
  const navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [Username, setUsername] = useState('')
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [phone, setPhone] = useState('');  
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let dispatch = useDispatch();
  let {userData} = useSelector(state => state.user); 

  const handleSignup = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const result = await axios.post(`${serverurl}/api/auth/signup`, {
        Username: Username, 
        email: email,
        phone: phone,  
        password: password
        
      }, {
        withCredentials: true
      })
      dispatch(setUserData(result.data));
      
      console.log("Signup success:", result.data);
      setUsername("")
      setEmail("")
      setPassword("")
      setPhone("")
      setLoading(false);
    }
    catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      console.log(`signup la error iruku, bcoz ${err.response?.data || err.message}`);
    }
  }

  return (
    <>
      <div className='min-h-screen w-screen bg-black relative overflow-hidden flex justify-center items-center p-4'>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}></div>

        <div className='max-w-md w-full h-[90vh] backdrop-blur-md bg-black/40  flex flex-col gap-4 shadow-black shadow-2xl shadow-24 rounded-2xl'>
          <div className='w-full h-[30vh] flex flex-row gap-4 justify-center items-center bg-black/40 rounded-b-3xl rounded-t-2xl playwrite-no-123 text-white '>
            <img src={light} alt="light" className='w-20 h-auto' />
            <h1>Pradeep's Chatting Application</h1>
          </div>
          <div className='w-full h-[80vh] px-4 flex flex-col gap-4 justify-center'>
            <h3 className='flex justify-center items-center flex-col gap-4 text-md text-lime-100  playwrite-no-123'>
              Sign Up to Pradeep's Chatting Application
              <br></br>
              Real-time talk, zero distance.
            </h3>
            <form className='flex flex-col gap-6 px-4 py-4' onSubmit={handleSignup}>
              <input type="text" placeholder='Username' className='bg-transparent text-lime-100 rounded-md px-4 py-2 outline-none border border-white/40 focus:outline-none' 
                onChange={(e) => setUsername(e.target.value)} value={Username} required />
              
              <input type="email" placeholder='Email' className='bg-transparent text-lime-100 rounded-md px-4 py-2 outline-none border border-white/40 focus:outline-none' 
                onChange={(e) => setEmail(e.target.value)} value={email} required />
              
              <input type="tel" placeholder='Phone Number' className='bg-transparent text-lime-100 rounded-md px-4 py-2 outline-none border border-white/40 focus:outline-none' 
                onChange={(e) => setPhone(e.target.value)} value={phone} required />
              
              <div className='flex flex-row gap-4 items-center rounded-md bg-transparent text-lime-100 outline-none border border-white/40 focus:outline-none relative'>
                <input type={showPassword ? "text" : "password"} placeholder='Password' className='bg-transparent text-lime-100 px-4 py-2 outline-none h-full w-full focus:outline-none' 
                  onChange={(e) => setPassword(e.target.value)} value={password} required />
                <span className='absolute right-4 cursor-pointer text-white/60' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>

              <button type='submit' className='bg-black/40 text-lime-100 rounded-md p-4 outline-none border border-white/40 focus:outline-lime-100 w-[35%] self-center'>
                {loading? "wait_pannunga":"Sign Up"}
              </button>
            </form>
            {error && <p className='text-[#ffa71f] text-center flex justify-center items-center'>{error}</p>}
            <p className='flex justify-center items-center flex-row text-[12px] gap-4 text-md text-lime-100  playwrite-no-123 cursor-pointer'>
              Already have an account?
              <a className='text-[#ffa71f] ml-1' onClick={() => navigate('/login')}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default signup