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
import create from "../../../Assets/create.png"
import complete from "../../../Assets/complete.png"
import remainder from "../../../Assets/remainder.png"
import settings from "../../../Assets/settings.png"
import pending from "../../../Assets/pending.png"
import all from "../../../Assets/all.png"
import Home from "../../../Assets/Home.png"
import id from "../../../Assets/id.png"
import dropQuotation from "../../../Assets/dropQuotation.png"
import './SideNav.css'
import axios from "axios";

const SideNav = () => {

  const { userAccess, userDetails } = useContext(Appcontext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/')
  };

  const handleClick = async () => {
  try {
    const dataset = {
      userId: userDetails.userId,
      name: userDetails.userName,
    };

    const response = await axios.post('http://localhost:8081/createQuotation', dataset);
    
    if (response.status === 200 && response.data.status === 200) {
      navigate(`createquotation/${response.data.id}`);
    } else {
      console.error('Error:', response.data.message);
      // Display an error message to the user
      alert('Failed to create quotation: ' + response.data.message);
    }
  } catch (err) {
    console.error('API call failed:', err);
    // Display a general error message to the user
    alert('An error occurred while creating the quotation. Please try again later.');
  }
};


  return (
    <div className="d-flex m-0 p-0" style={{ height: '100vh', overflow: 'hidden' }}>

      <div className="d-flex flex-column side-bar-main-head sideBar align-items-start p-3 gap-4 m-0">

        <NavLink className='mb-4' exact='true' to=''>Trichy Tour Planner</NavLink>

        <NavLink exact="true" to="/home" activeClassName="activeClicked">
          <img src={Home} className="iconn" />
          <span className="m-0 p-0">Home</span>
        </NavLink>

        <button onClick={handleClick} className="Createbutton">
          <img src={create} className="iconn" alt="Create" />
          <span className="m-0 p-0">Create a Quotation</span>
        </button>

        <NavLink exact="true" to="/home/pendingquotation" activeClassName="activeClicked">
          <img src={pending} className="iconn" />
          <span className="m-0 p-0">Pending Quotation</span>
        </NavLink>

        <NavLink exact="true" to="/home/completequotation" activeClassName="activeClicked">
          <img src={complete} className="iconn" />
          <span className="m-0 p-0">Complete Quotation</span>
        </NavLink>

        <NavLink exact="true" to="/home/ongoingstatus" activeClassName="activeClicked">
          <img src={settings} className="iconn" />
          <span className="m-0 p-0">Ongoing Status</span>
        </NavLink>
        
        <NavLink exact="true" to="/home/allquotation" activeClassName="activeClicked">
          <img src={all} className="iconn" />
          <span className="m-0 p-0">All Quotation</span>
        </NavLink>

        <NavLink exact="true" to="/home/reminder" activeClassName="activeClicked">
          <img src={dropQuotation} className="iconn" />
          <span className="m-0 p-0">Drop Quotation</span>
        </NavLink>

        <NavLink exact="true" to="/home/reminder" activeClassName="activeClicked">
          <img src={remainder} className="iconn" />
          <span className="m-0 p-0">Reminder</span>
        </NavLink>

        {userAccess.admin &&
          <NavLink exact="true" to="/home/createid" activeClassName="activeClicked">
            <img src={id} className="iconn" />
            <span>Create Employee ID</span>
          </NavLink>
        }

        <button className="mt-auto" style={{ all: "unset", color: '#EBF4F6' }} onClick={handleLogout}>Logout</button>

      </div>

      <div className="content" style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/createquotation/:id" element={<CreateQuotation />} />
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
