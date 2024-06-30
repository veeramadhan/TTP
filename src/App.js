import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Components/LoginControl/Login/Login";
import CreateID from "./Components/LoginControl/Create Empolyee ID/CreateID";
import SideNav from "./Components/HomeControl/SideNav/SideNav";
import './App.css'

export const Appcontext = createContext(null);

const App = () => {

  const [userAccess, setUserAccess] = useState({
    admin: false,
    quotation: false,
    edit: false,
  });

  let auth = localStorage.getItem('auth')

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/sidenav')
    }
    console.log(auth);
  }, [auth])

  return (
    <Appcontext.Provider value={{ userAccess, setUserAccess }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createid" element={<CreateID />} />
        <Route path="/sidenav/*" element={<SideNav />} />
      </Routes>
    </Appcontext.Provider>
  );

};

export default App;