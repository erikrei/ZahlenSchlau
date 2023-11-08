import React from "react";
import { useParams, useLoaderData } from "react-router-dom";
import "./Abfrage.css";

import { TExerciseData } from "../../types/types.d";

import { operationDescriptions } from "../../data/data.d";

import { getHeaderOperationText } from "../../helper-functions/getHeaderOperationText";
import { getOperationSymbol } from "../../helper-functions/getOperationSymbol";

import AbfrageHeader from "./AbfrageHeader";
import AbfrageSidebar from "./AbfrageSidebar";
import AbfrageMain from "./AbfrageMain";
import AbfrageProvider from "../../contexts/AbfrageContext";

export default function Abfrage() {
  const { operation } = useParams();
  const data: TExerciseData[] = useLoaderData() as TExerciseData[];
  const dataFromOperation = data.filter(
    (exercise) => exercise.operation === operation
  );

  const operationGerman = operation && getHeaderOperationText(operation);
  const operationSymbol = operation && getOperationSymbol(operation);

  const currentOperationDescription = operationDescriptions.find(
    (operationDescription) => operationDescription.operation === operation
  )?.description;

  return (
    <div className="abfrage-container">
      <AbfrageHeader operation={operationGerman} />
      <div className="abfrage-content">
        <AbfrageProvider>
          <AbfrageSidebar
            operation={operationGerman}
            operationSymbol={operationSymbol}
            description={currentOperationDescription}
          />
          <AbfrageMain
            operationSymbol={operationSymbol}
            data={dataFromOperation}
          />
        </AbfrageProvider>
      </div>
    </div>
  );
}
