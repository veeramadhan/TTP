import React, { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import CreateQuotation from "../CreateQuotation/CreateQuotation";
import PendingQuotation from "../PendingQuotation/PendingQuotation";
import CompleteQuotation from "../CompleteQuotation/CompleteQuotation";
import OngoingStatus from "../OngoingStatus/OngoingStatus";
import AllQuotation from "../AllQuotation/AllQuotation";
import CreateID from '../../LoginControl/Create Empolyee ID/CreateID';
import { Appcontext } from '../../../App';
import Homepage from "../Home/Homepage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './SideNav.css'

const SideNav = () => {
  const { userAccess } = useContext(Appcontext);

  return (

    <div className="d-flex m-0 p-0" style={{ height: '100vh', overflow: 'hidden' }}>

      <div className="d-flex flex-column side-bar-main-head col-2 align-items-start p-4 gap-4 m-0">

        <NavLink className='mb-4' exact='true' to=''>Trichy Tour Planner</NavLink>

        <NavLink exact="true" to="/sidenav/home" activeClassName="activeClicked">Home</NavLink>
        <NavLink exact="true" to="/sidenav/createquotation" activeClassName="activeClicked">Create a Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/pendingquotation" activeClassName="activeClicked">Pending Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/completequotation" activeClassName="activeClicked">Complete Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/ongoingstatus" activeClassName="activeClicked">Ongoing Status</NavLink>
        <NavLink exact="true" to="/sidenav/allquotation" activeClassName="activeClicked">All Quotation</NavLink>
        <NavLink exact="true" to="/sidenav/reminder" activeClassName="activeClicked">Reminder</NavLink>

        {userAccess.admin &&
          <NavLink exact="true" to="/sidenav/createid" activeClassName="activeClicked">
            Create Employee ID
          </NavLink>
        }

        <button className="mt-auto" style={{ all: "unset", color: '#EBF4F6' }}>Logout</button>

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
