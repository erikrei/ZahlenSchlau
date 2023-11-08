import React from "react";

import "./Dashboard.css";
import DashboardSidebar from "./DashboardSidebar";
import DashboardMain from "./DashboardMain";

import ActiveLinkProvider from "../../contexts/ActiveLinkContext";

export default function Dashboard() {
  return (
    <ActiveLinkProvider>
      <div className="dashboard-container">
        <DashboardSidebar />
        <DashboardMain />
      </div>
    </ActiveLinkProvider>
  );
}
