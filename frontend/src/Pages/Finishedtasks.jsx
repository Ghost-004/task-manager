import React from 'react'
import Cards from '../components/Home/Cards.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Finishedtasks = () => {
  const [Data, setData] = useState()
  const headers = { 
    id: localStorage.getItem("id"), 
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
      const fetch = async () => {
          const response = await axios.get(
              "http://localhost:1000/api/v2/get-complete-tasks",
              { headers }
          );
          setData(response.data.data);
      }
      fetch();
  });
  return (
    <div>
      <Cards home={"false"} data={Data}/> 
    </div>
  )
}

export default Finishedtasks