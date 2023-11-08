import React from "react";

import { TExerciseAnswers } from "../../helper-functions/getAbfrageAntworten";

import { useAbfrageContext } from "../../contexts/AbfrageContext";
import { TExerciseData } from "../../types/types.d";

type TAbfrageAntwortenProps = {
  answers: TExerciseAnswers[];
  setExerciseIndex: React.Dispatch<React.SetStateAction<number>>;
  data: TExerciseData[],
  index: number
};

export default function AbfrageAntworten({
  answers,
  setExerciseIndex,
  data,
  index
}: TAbfrageAntwortenProps) {
  // Brauche noch richtige Antwort für Überprüfung
  const { exercisesHistory, setExercisesHistory } = useAbfrageContext();
  const currentExercise = data[index];

  return (
    <section className="abfrage-answers">
      {answers.map((answer) => (
        <button
          key={answer._id}
          className="answer-button"
          onClick={() => {
            setExerciseIndex(prev => prev + 1);
            setExercisesHistory([
              ...exercisesHistory,
              {
                _id: answer._id,
                numberOne: currentExercise.numberOne,
                numberTwo: currentExercise.numberTwo,
                result: currentExercise.result,
                answer: answer.answerNumber,
                operation: currentExercise.operation
              }
            ])
          }}
        >
          {answer.answerNumber}
        </button>
      ))}
    </section>
  );
}
