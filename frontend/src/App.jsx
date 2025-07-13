import { Routes, Route, useNavigate } from "react-router";
import Home from "./Pages/Home.jsx";
import Alltasks from "./Pages/Alltasks.jsx";
import Prioritytasks from "./Pages/Prioritytasks.jsx";
import Pendingtasks from "./Pages/Pendingtasks.jsx";
import Finishedtasks from "./Pages/Finishedtasks.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth.js";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login);
    }
    else if(isLoggedIn === false){
      navigate('/login');
    }
  }, []);
  return (
    <div className="bg-gray-50 text-gray-900 h-screen p-2 relative">
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Alltasks />}/>
            <Route path='/priorityTasks' element={<Prioritytasks />}/>
            <Route path='/pendingTasks' element={<Pendingtasks />}/>
            <Route path='/finishedTasks' element={<Finishedtasks />}/>
          </Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default App
