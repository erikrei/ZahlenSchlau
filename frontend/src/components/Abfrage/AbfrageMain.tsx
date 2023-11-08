import React from "react";

import { TExerciseData } from "../../types/types.d";

import { getAbfrageAntworten } from "../../helper-functions/getAbfrageAntworten";

import AbfrageMainHeader from "./AbfrageMainHeader";
import AbfrageAntworten from "./AbfrageAntworten";
import { getOperationSymbol } from "../../helper-functions/getOperationSymbol";

type TMainProps = {
  data: TExerciseData[];
};

export default function AbfrageMain({ data }: TMainProps) {
  const [exerciseIndex, setExerciseIndex] = React.useState(0);
  const currentExercise = data[exerciseIndex];
  const totalExercises = data.length;
  const currentExerciseAnswers = getAbfrageAntworten(currentExercise.result, 4, 5);

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
        index={exerciseIndex}
        data={data}
      />
    </main>
  );
}
