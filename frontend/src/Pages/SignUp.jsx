import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useSelector } from "react-redux";

const SignUp = () => {
    const [Data, setData] = useState({ username: "", email: "", password: ""});
    const nav = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    if(isLoggedIn === true) {
        nav('/')
    } 

    const change = (e) => {
        const  {name, value} = e.target;
        setData ({...Data, [name]:value});
    }

    const submit = async () => {
        try {
            if(Data.username === "" || Data.email === "" || Data.password === ""){
                alert("All fields are required");
            }
            else{
                const response = await axios.post("http://localhost:1000/api/v1/sign-up", Data);
                setData({username:"", email:"", password:""})
                console.log(response);
                nav('/login')
            }
        } catch(e){
            alert(e);
        }
    }
    return (
        <div className='h-[98vh] flex items-center justify-center '>
            <div className='p-4 w-2/6 rounded-xl bg-white shadow-sm border border-gray-200'>
                <div className='text-xl text-gray-900 ml-1'>Sign Up</div>
                <input 
                    type='username' 
                    placeholder='username' 
                    className='bg-gray-100 px-3 py-2 my-3 w-full rounded-xl text-gray-900'
                    name='username'
                    value={Data.username}
                    onChange={change}
                />
                <input 
                    type='email' 
                    placeholder='email' 
                    className='bg-gray-100 px-3 py-2 my-3 w-full rounded-xl text-gray-900'
                    name='email'
                    value={Data.email}
                    onChange={change}
                />
                <input 
                    type='password' 
                    placeholder='password' 
                    className='bg-gray-100 px-3 py-2 my-3 w-full rounded-xl text-gray-900'
                    name='password'
                    value={Data.password}
                    onChange={change}
                />
                <div className='w-full flex items-center justify-between text-gray-600 '>
                    <button onClick={submit} className='bg-blue-500 text-xl font-semibold px-3 py-2 rounded text-black hover:cursor-pointer hover:text-white hover:scale-102 transition-all duration-300'>Sign Up</button>
                    <Link className='hover:bg-gray-200 hover:text-gray-900 text-sm rounded-sm px-4 py-3 ' to='/login'>Already have an account? Log In here!</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp