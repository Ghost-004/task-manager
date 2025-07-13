import React, { use, useEffect, useState } from 'react'
import { GrNotes } from "react-icons/gr";
import { MdPriorityHigh } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const data = [
        {
            title: "All",
            icon: <GrNotes />,
            link: "/"
        },
        {
            title: "High Priority",
            icon: <MdPriorityHigh />,
            link: "/priorityTasks"
        },
        {
            title: "Pending",
            icon: <MdPending />,
            link: "/pendingTasks"
        },
        {
            title: "Finished",
            icon: <MdDone />,
            link: "/finishedTasks"
        }
    ]

    const [Data, setData] = useState();
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        nav('/login')
    }

    const headers = { 
        id: localStorage.getItem("id"), 
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:1000/api/v2/get-all-tasks",
                { headers }
            );
            setData(response.data.data);
        }
        fetch();
    }, []);

    return (
        <>
            {Data && (
                <div>
                    <h2 className='text.xl font-semibold pb-3 text-gray-900'>{Data.username}</h2>
                    <hr />
                </div>
            )}
            <ul>
                {data.map((items, i) => (
                    <Link 
                        to={items.link}
                        key={i} 
                        className='my-2 flex items-center hover:bg-gray-200 p-2 rounded transition-all duration-300 cursor-pointer text-gray-900'
                    > 
                        {items.icon} &nbsp; {items.title}
                    </Link>
                ))}
            </ul>
            <div>
                <button onClick={logout} className='bg-gray-200 w-full p-2 rounded text-gray-900 hover:text-white hover:bg-gray-600 hover:cursor-pointer transition-all duration-300'>Log Out</button>
            </div>
        </>
  )
}

export default Sidebar