import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authActions } from '../store/auth.js'
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
    const [Data, setData] = useState({ username: "", password: ""});
    const nav = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isLoggedIn) {
            dispatch(authActions.login());
        }
    }, [dispatch, isLoggedIn]);
    
      
    const change = (e) => {
        const  {name, value} = e.target;
        setData ({...Data, [name]:value});
    }

    const submit = async () => {
        try {
            if(Data.username === "" || Data.password === ""){
                alert("All fields are required");
            }
            else{
                const response = await axios.post("http://localhost:1000/api/v1/log-in", Data);
                setData({username:"", email:"", password:""})
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token",response.data.token);
                dispatch(authActions.login());
                nav('/');
            }
        } catch(e){
            alert("Password or username is incorrect");
        }
    }
    return (
        <div className='h-[98vh] flex items-center justify-center'>
            <div className='p-4 w-2/6 rounded-xl bg-white shadow-sm border border-gray-200'>
                <div className='text-xl text-gray-900 ml-1'>Log In</div>
                <input 
                    type='username' 
                    placeholder='username' 
                    className='bg-gray-100 px-3 py-2 my-3 w-full rounded-xl text-gray-900'
                    name='username'
                    value={Data.username}
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
                    <button onClick={submit} className='bg-blue-500 text-xl font-semibold px-3 py-2 rounded text-black hover:cursor-pointer hover:text-white hover:scale-102 transition-all duration-300'>
                        Login
                    </button>
                    <Link className='hover:bg-gray-200 hover:text-gray-900 text-sm rounded-sm px-4 py-3' to='/signup'>Don't have an account? Sign up here!</Link>
                </div>
            </div>
        </div>
    )
}

export default Login