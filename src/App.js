import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/LoginControl/Login/Login";
import CreateID from "./Components/LoginControl/Create Empolyee ID/CreateID";
import SideNav from "./Components/HomeControl/SideNav/SideNav";

export const Appcontext = createContext(null);

const App = () => {
  const [userAccess, setUserAccess] = useState({
    admin: false,
    quotation: false,
    edit: false,
  });

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
