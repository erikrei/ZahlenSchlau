import React from "react";

import { TExerciseData } from "../../types/types.d";

import { getAbfrageAntworten } from "../../helper-functions/getAbfrageAntworten";

import AbfrageMainHeader from "./AbfrageMainHeader";
import AbfrageAntworten from "./AbfrageAntworten";

type TMainProps = {
  operationSymbol?: string;
  data: TExerciseData[];
};

export default function AbfrageMain({ operationSymbol, data }: TMainProps) {
  const [exerciseIndex, setExerciseIndex] = React.useState(0);
  const totalExercises = data.length;
  const currentExerciseAnswers = getAbfrageAntworten(data[exerciseIndex].result, 4, 5);
  
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
