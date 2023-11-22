import React from "react";
import axios from "axios";
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

import ErrorPage from "./components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/abfrage/:type",
    element: <Abfrage />,
    loader: async ({ params, request }) => {
      const abfrageType = params.type || "";
      const url = new URL(request.url);

      const listName = url.searchParams.get("listName");

      if (
        ["addition", "subtraction", "multiplication", "division"].includes(
          abfrageType
        )
      ) {
        return axios
          .get(`http://localhost:3000/exercises/random?type=${abfrageType}`)
          .then(({ data }) => {
            return data;
          });
      } else {
        return axios
          .get(`http://localhost:3000/exercises/list?listName=${listName}`)
          .then(({ data }) => {
            return data;
          })
          .catch(({ response }) => {
            if (response.status === 404) {
              return {
                errorMessage: response.data,
                statusCode: response.status,
              };
            }
          });
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
  {
    path: "/error",
    element: <ErrorPage />,
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
