import React from "react";
import { useParams, useLoaderData, useSearchParams } from "react-router-dom";
import "./Abfrage.css";

import { TExerciseData } from "../../types/types.d";

import { operationDescriptions } from "../../data/data.d";

import { getHeaderOperationText } from "../../helper-functions/getHeaderOperationText";

import AbfrageHeader from "./AbfrageHeader";
import AbfrageSidebar from "./AbfrageSidebar";
import AbfrageMain from "./AbfrageMain";
import AbfrageProvider from "../../contexts/AbfrageContext";

export default function Abfrage() {
  const { type } = useParams();
  const [params] = useSearchParams(); 
  
  const data: TExerciseData[] = useLoaderData() as TExerciseData[];

  let operationGerman = type && getHeaderOperationText(type);

  if (type === 'list') {
    operationGerman = params.get('listName') || '';
  }

  const currentOperationDescription = operationDescriptions.find(
    (operationDescription) => operationDescription.operation === type
  )?.description;

  return (
    <div className="abfrage-container">
      <AbfrageHeader operation={operationGerman} />
      <div className="abfrage-content">
        <AbfrageProvider>
          <AbfrageSidebar
            operation={operationGerman}
            description={currentOperationDescription}
          />
          <AbfrageMain
            data={data}
          />
        </AbfrageProvider>
      </div>
    </div>
  );
}
