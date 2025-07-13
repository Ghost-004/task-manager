import React from 'react';
import { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards.jsx';
import { IoMdAdd } from "react-icons/io";
import Input from '../components/Home/Input.jsx';
import axios from 'axios';

const Alltasks = () => {
  const [inputDivVisible, setInputDivVisible] = useState(false);
  const [Data, setData] = useState();
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: ""
  })
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
  });

  return (
    <>
      <div>
        <div className='w-full flex justify-end p-4'>
          <IoMdAdd 
            className='text-2xl text-gray-500 hover:text-gray-900 transition-all duration-300'
            onClick={() => setInputDivVisible(true)}
          />
        </div>
        {Data && <Cards home={"true"} showPage={()=> setInputDivVisible(true)} onClose={() => setInputDivVisible(true) } setUpdatedData={setUpdatedData} data={Data.tasks} important={Data.important}/>}
      </div>
      {inputDivVisible && (
        <Input updatedData={updatedData} setUpdatedData={setUpdatedData} onClose={() => setInputDivVisible(false) } showPage={()=> setInputDivVisible(true)}/>
      )} 
    </>
  )
}

export default Alltasks