import React from "react";

import { TExerciseData } from "../../types";

type TAbfrageHeaderProps = {
  operationSymbol?: string;
  currentExercise: TExerciseData;
  totalExercises: number;
  currentExerciseNumber: number;
};

export default function AbfrageMainHeader({
  operationSymbol,
  currentExercise,
  totalExercises,
  currentExerciseNumber,
}: TAbfrageHeaderProps) {
  return (
    <section className="abfrage-main-header">
      <span>Aktuelle Aufgabe</span>
      <h2>
        {currentExercise.numberOne} {operationSymbol}{" "}
        {currentExercise.numberTwo}
      </h2>
      <span>
        Aufgabe {currentExerciseNumber + 1} von {totalExercises}
      </span>
    </section>
  );
}
