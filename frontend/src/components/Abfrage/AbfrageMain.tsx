import React from "react";

import { TExerciseData } from "../../types/types.d";

import { getAbfrageAntworten } from "../../helper-functions/getAbfrageAntworten";
import { getOperationSymbol } from "../../helper-functions/getOperationSymbol";

import AbfrageMainHeader from "./AbfrageMainHeader";
import AbfrageAntworten from "./AbfrageAntworten";
import AbfrageStatistik from "./AbfrageStatistik";

type TMainProps = {
  data: TExerciseData[];
};

export default function AbfrageMain({ data }: TMainProps) {
  const [exerciseIndex, setExerciseIndex] = React.useState(0);
  const totalExercises = data.length;

  // Wenn letzte Aufgabe beantwortet wurde (also Index === TotalLength)
  // wird die Statistik gerendert
  if (exerciseIndex === totalExercises) {
    return (
      <main className="abfrage-statistik-container">
        <AbfrageStatistik />
      </main>
    );
  }

  const currentExercise = data[exerciseIndex];

  const currentExerciseAnswers = getAbfrageAntworten(
    currentExercise.result,
    4,
    5
  );

  const operationSymbol = getOperationSymbol(currentExercise.operation);

  return (
    <main className="abfrage-main-container">
      <AbfrageMainHeader
        operationSymbol={operationSymbol}
        currentExercise={data[exerciseIndex]}
        totalExercises={totalExercises}
        currentExerciseNumber={exerciseIndex}
      />
      <AbfrageAntworten
        answers={currentExerciseAnswers}
        setExerciseIndex={setExerciseIndex}
        currentExercise={currentExercise}
      />
    </main>
  );
}
