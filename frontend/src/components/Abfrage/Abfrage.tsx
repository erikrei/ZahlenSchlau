import React from "react";
import { useParams, useLoaderData, useSearchParams, Navigate } from "react-router-dom";
import "./Abfrage.css";

import { TExerciseData } from "../../types";
import { TExerciseDataWithSettings } from "../../types";

import { operationDescriptions } from "../../data/data.d";
import { getHeaderOperationText } from "../../helper-functions/getHeaderOperationText";

import AbfrageHeader from "./AbfrageHeader";
import AbfrageSidebar from "./AbfrageSidebar";
import AbfrageMain from "./AbfrageMain";
import AbfrageProvider from "../../contexts/AbfrageContext";
import ErrorPage from "../ErrorPage/ErrorPage";

export default function Abfrage() {
  const { type } = useParams();
  const [params] = useSearchParams();

  const loaderData: TExerciseDataWithSettings =
    useLoaderData() as TExerciseDataWithSettings;

  if (loaderData.statusCode === 404) {
    return <Navigate to="/error" />
  }

  const { data }: { data: TExerciseData[] } = loaderData;

  let operationGerman = type && getHeaderOperationText(type);

  if (type === "list") {
    operationGerman = params.get("listName") || "";
  }

  const currentOperationDescription = operationDescriptions.find(
    (operationDescription) => operationDescription.operation === type
  )?.description;

  return (
    <div className="abfrage-container">
      <AbfrageProvider>
        <AbfrageHeader operation={operationGerman} />
        <div className="abfrage-content">
          <AbfrageSidebar
            operation={operationGerman}
            description={currentOperationDescription}
          />
          <AbfrageMain data={data} />
        </div>
      </AbfrageProvider>
    </div>
  );
}
