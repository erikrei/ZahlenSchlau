import React from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import DashboardBackButton from "./util/DashboardBackButton";

export default function CreateLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const listName = searchParams && searchParams.get("edit");
  const { createType } = useParams();

  return (
    <div className="create-layout-container">
      <header>
        <DashboardBackButton />
        {listName ? (
          <h1>
            {listName} <span>Bearbeiten</span>
          </h1>
        ) : (
          <h1>
            Aufgabenliste <span>erstellen</span>
          </h1>
        )}
      </header>
      <Outlet />
    </div>
  );
}
