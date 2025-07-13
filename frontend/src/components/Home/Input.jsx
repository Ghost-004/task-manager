import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from 'axios';

const Input = ({ onClose, updatedData, setUpdatedData }) => {
    const [Data, setData] = useState({ title: "", desc: "" });

    useEffect(() => {
        if (updatedData && updatedData.id) {
            setData({ title: updatedData.title, desc: updatedData.desc });
        } else {
            setData({ title: "", desc: "" });
        }
    }, [updatedData.id]);
    

    const headers = { 
        id: localStorage.getItem("id"), 
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const change = (e) => {
        const { name, value } = e.target;
        setData({...Data, [name]: value});
    }
    const submitData = async () => {
        if(Data.title === "" || Data.desc === "") {
            alert("All fields are required");
        }
        else {
            await axios.post(
                "http://localhost:1000/api/v2/create-task",
                Data,
                { headers }
            )
            setData({ title: "", desc: "" })
            onClose();
        }
    }

    const updateTask = async () => {
        if(Data.title === "" || Data.desc === "") {
            alert("All fields are required");
        }
        else {
            await axios.put(
                `http://localhost:1000/api/v2/update-task/${updatedData.id}`,
                Data,
                { headers } 
            )
            setData({ title: "", desc: "" });
            setUpdatedData({id:"", title: "", desc: "" });
            onClose();
        }
    }
    return (
        <>
            <div className='fixed top-0 left-0 bg-gray-200 opacity-80 h-screen w-full'></div>
            <div className='fixed top-0 left-0 flex items-center justify-center h-screen w-full'>
                
                <div className='w-3/6 bg-white p-4 rounded'>
                    <div className='flex justify-end'>
                        <button 
                            className='text-2xl' 
                            onClick={() => {
                                onClose();
                                setData({ title: "", desc: "" });
                                setUpdatedData({id:"", title: "", desc: "" });
                            }}

                        >
                            <IoIosCloseCircleOutline className='hover:text-red-400 transition-all duration-300'/>
                        </button>
                    </div>
                    <input 
                        type="text" 
                        placeholder='Title' 
                        name='title'
                        className='px-3 py-2 rounded w-full bg-gray-100 my-3 text-gray-900'
                        value={Data.title}
                        onChange={change}
                    />
                    <textarea 
                        name="desc" 
                        cols="30" 
                        rows="10"
                        placeholder="Description"
                        className='px-3 py-2 rounded w-full bg-gray-100 my-3 text-gray-900'
                        value={Data.desc}
                        onChange={change}
                    ></textarea>
                    {updatedData.id !== "" ? 
                        (<button 
                            onClick={updateTask}
                            className='px-3 py-2 bg-blue-500 rounded text-black text-xl font-semibold hover:cursor-pointer hover:text-white hover:scale-102 transition-all duration-300'
                        >
                            Update
                        </button>) : 
                        (<button 
                            onClick={submitData}
                            className='px-3 py-2 bg-blue-500 rounded text-black text-xl font-semibold hover:cursor-pointer hover:text-white hover:scale-102 transition-all duration-300'
                        >
                            Submit
                        </button>)
                    }
                </div>
            </div>
        </>
    )
}

export default Input