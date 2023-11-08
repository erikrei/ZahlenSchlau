import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Dashboard from "./components/Dashboard/Dashboard";
import Abfrage from "./components/Abfrage/Abfrage";

import CreateLayout from "./components/CreateLayout";
import CreateList from "./components/Erstellen/CreateList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: async () => {
      return fetch("http://localhost:3000/lists");
    },
  },
  {
    path: "/abfrage/:type",
    element: <Abfrage />,
    // erster loader wenn mit Docker gestartet
    loader: async ({ params, request }) => {
      // ["addition", "subtraction", "multiplication", "division"]
      // list
      const abfrageType = params.type || "";
      const url = new URL(request.url);
      
      const listName = url.searchParams.get('listName'); 

      if (
        ["addition", "subtraction", "multiplication", "division"].includes(
          abfrageType
        )
      ) {
        return fetch(
          `http://localhost:3000/exercises/random?type=${abfrageType}`
        );
      } else {
        return fetch(`http://localhost:3000/exercises/list?listName=${listName}`)
      }
    },
  },
  {
    path: "/create",
    element: <CreateLayout />,
    children: [
      {
        path: ":createType",
        element: <CreateList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
