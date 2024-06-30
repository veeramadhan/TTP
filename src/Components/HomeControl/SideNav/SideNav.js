import React, { useContext } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import PendingQuotation from "../PendingQuotation/PendingQuotation";
import CompleteQuotation from "../CompleteQuotation/CompleteQuotation";
import OngoingStatus from "../OngoingStatus/OngoingStatus";
import AllQuotation from "../AllQuotation/AllQuotation";
import CreateID from '../../LoginControl/Create Empolyee ID/CreateID';
import { Appcontext } from '../../../App';
import Homepage from "../Home/Homepage";
import CreateQuotation from "../CreateQuotation/CreateQuotation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import create from "../../../Assets/create.png"
import complete from "../../../Assets/complete.png"
import remainder from "../../../Assets/remainder.png"
import settings from "../../../Assets/settings.png"
import pending from "../../../Assets/pending.png"
import all from "../../../Assets/all.png"
import Home from "../../../Assets/Home.png"
import id from "../../../Assets/id.png"
import './SideNav.css'

const SideNav = () => {
  const { userAccess } = useContext(Appcontext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8081/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        navigate('/'); // Redirect to the login page after successful logout
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="d-flex m-0 p-0" style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="d-flex flex-column side-bar-main-head sideBar align-items-start p-4 gap-4 m-0">
        <NavLink className='mb-4' exact='true' to=''>Trichy Tour Planner</NavLink>
        <NavLink exact="true" to="/sidenav/home" activeClassName="activeClicked"><span><img src={Home} className="iconn"/></span>Home</NavLink>
        <NavLink exact="true" to="/sidenav/createquotation" activeClassName="activeClicked"><span><img src={create} className="iconn"/></span>Create a Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/pendingquotation" activeClassName="activeClicked"><span><img src={pending} className="iconn"/></span>Pending Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/completequotation" activeClassName="activeClicked"><span><img src={complete} className="iconn"/></span>Complete Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/ongoingstatus" activeClassName="activeClicked"><span><img src={settings} className="iconn"/></span>Ongoing Status</NavLink>
        <NavLink exact="true" to="/sidenav/allquotation" activeClassName="activeClicked"><span><img src={all} className="iconn"/></span>All Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/reminder" activeClassName="activeClicked"><span><img src={remainder} className="iconn"/></span>Reminder</NavLink>
        {userAccess.admin &&
          <NavLink exact="true" to="/sidenav/createid" activeClassName="activeClicked">
            <span><img src={id} className="iconn"/></span>
            Create Employee ID
          </NavLink>
        }
        <button className="mt-auto" style={{ all: "unset", color: '#EBF4F6' }} onClick={handleLogout}>Logout</button>
      </div>
      <div className="content" style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/createquotation" element={<CreateQuotation />} />
          <Route path="/pendingquotation" element={<PendingQuotation />} />
          <Route path="/completequotation" element={<CompleteQuotation />} />
          <Route path="/ongoingstatus" element={<OngoingStatus />} />
          <Route path="/allquotation" element={<AllQuotation />} />
          <Route path="/createid" element={<CreateID />} />
        </Routes>
      </div>
    </div>
  );
};

export default SideNav;
