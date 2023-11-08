import React from "react";
import { Outlet, useParams } from "react-router-dom";

import DashboardBackButton from "./util/DashboardBackButton";

export default function CreateLayout() {
  const { createType } = useParams();

  return (
    <div className="create-layout-container">
      <header>
        <DashboardBackButton />
        <h1>
          Erstellen <span>{createType}</span>
        </h1>
      </header>
      <Outlet />
    </div>
  );
}
