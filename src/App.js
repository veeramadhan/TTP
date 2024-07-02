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

  const [userDetails, setUserDetails] = useState([]);

  let accessDetails = localStorage.getItem('userAccess');
  let auth = localStorage.getItem('auth');

  useEffect(() => {
    if (auth != '') {
      setUserDetails(JSON.parse(accessDetails))
    }
  }, [auth, accessDetails])

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails])

  return (
    <Appcontext.Provider value={{ userAccess, setUserAccess, userDetails, setUserDetails }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createid" element={<CreateID />} />
        <Route path="/home/*" element={<SideNav />} />
      </Routes>
    </Appcontext.Provider>
  );

};

export default App;