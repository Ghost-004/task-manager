import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
const Cards = ({ home, onClose, data, setUpdatedData, showPage }) => {
    const headers = { 
        id: localStorage.getItem("id"), 
        authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const handleCompleteTask = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:1000/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            )
        } catch(e){
            console.error(e);
        }
    }
    const handleImportantTask = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:1000/api/v2/update-imp-task/${id}`,
                {},
                { headers }
            )
        } catch(e){
            console.error(e);
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`,
                { headers }
            )
        } catch(e) {
            console.error(e);
        }
    }

    const handleEditTask = async (id, title, desc) => {
        setUpdatedData({ id:id, title:title, desc:desc })
        showPage();
    }

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data && data.map((items,i) => (
                <div key={i} className="flex flex-col justify-between bg-white rounded-sm p-4 hover:scale-105 transition-all duration-300 border border-gray-200 shadow-sm">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{items.title}</h3>
                        <p className="text-gray-700 my-2">{items.desc}</p>
                    </div>
                    <div className="mt-4 w-full flex items-center">
                        <button onClick={()=>handleCompleteTask(items._id)} className={`${items.complete === false ? "bg-red-400 text-white" : "bg-green-500 text-white"} hover:cursor-pointer p-2 rounded w-3/6`}>{items.complete ? "Complete" : "Pending"}</button>
                        <div className="text-gray-900 p-2 w-3/6 text-2xl font-semibold flex justify-around ">
                            <button className={"hover:cursor-pointer"} onClick={()=>handleImportantTask(items._id)}>{items.important ? (<IoMdHeart className="text-red-500"/>) : (<IoMdHeartEmpty/>)}</button>
                            {home !== "false" && (<button className={"hover:cursor-pointer"} onClick={()=>handleEditTask(items._id, items.title, items.desc)}><FiEdit2 /></button>)}
                            <button className={"hover:cursor-pointer"} onClick={()=>handleDeleteTask(items._id)}><RiDeleteBin6Fill /></button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && 
            <button onClick={onClose} className="flex flex-col justify-center items-center bg-white rounded-sm p-4 text-gray-700 hover:scale-105 hover:cursor-pointer transition-all duration-300 border border-gray-200 shadow-sm">
                <IoMdAdd className="text-5xl"/>
                <h2 className="text-2xl mt-4 py-2">Add Task</h2>
            </button>}
        </div>
    )
}

export default Cards;