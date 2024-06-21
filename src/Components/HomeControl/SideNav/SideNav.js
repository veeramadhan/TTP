import React, { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import CreateQuotation from "../CreateQuotation/CreateQuotation";
import PendingQuotation from "../PendingQuotation/PendingQuotation";
import CompleteQuotation from "../CompleteQuotation/CompleteQuotation";
import OngoingStatus from "../OngoingStatus/OngoingStatus";
import AllQuotation from "../AllQuotation/AllQuotation";
import CreateID from '../../LoginControl/Create Empolyee ID/CreateID';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Appcontext } from '../../../App';

const SideNav = () => {
  const { userAccess } = useContext(Appcontext);

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333" minWidth="15vw" maxWidth="20vw">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Trichy Tour Planner
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact="true" to="/sidenav" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/sidenav/createquotation" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Create a Quotation</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/sidenav/pendingquotation" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Pending Quotation</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/sidenav/completequotation" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Complete Quotation</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/sidenav/ongoingstatus" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Ongoing Status</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/sidenav/allquotation" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">All Quotation</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/sidenav/reminder" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reminder</CDBSidebarMenuItem>
            </NavLink>
            {userAccess.admin && (
              <NavLink exact="true" to="/sidenav/createid" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Create Employee ID</CDBSidebarMenuItem>
              </NavLink>
            )}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>TTP</div>
        </CDBSidebarFooter>
      </CDBSidebar>

      <div className="content" style={{ flex: 1, overflow: 'auto' }}>
        <Routes>
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
