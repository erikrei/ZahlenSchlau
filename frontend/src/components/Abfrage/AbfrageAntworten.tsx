import React from "react";

import { TExerciseAnswers } from "../../helper-functions/getAbfrageAntworten";

import { useAbfrageContext } from "../../contexts/AbfrageContext";
import { TExerciseData } from "../../types/types.d";
import AbfrageAntwortenVisual from "./AbfrageAntwortenVisual";

type TAbfrageAntwortenProps = {
  answers: TExerciseAnswers[];
  setExerciseIndex: React.Dispatch<React.SetStateAction<number>>;
  currentExercise: TExerciseData;
};

export default function AbfrageAntworten({
  answers,
  setExerciseIndex,
  currentExercise,
}: TAbfrageAntwortenProps) {
  // Brauche noch richtige Antwort für Überprüfung
  const { exercisesHistory, setExercisesHistory, visualLearning } =
    useAbfrageContext();
  const [renderFeedback, setRenderFeedback] = React.useState(false);

  const correctId = answers.find(
    (answer) => answer.answerNumber === currentExercise.result
  )?._id;

  function handleAnswerClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    _id: string
  ) {
    const { target } = event;

    if (!(target instanceof HTMLElement)) return;

    let clickedNumber: number;

    if (visualLearning && currentExercise.result <= 20) {
      console.log(target);
      clickedNumber = target.childNodes.length;
    } else {
      clickedNumber = Number(target.innerText);
    }

    if (clickedNumber !== currentExercise.result) {
      target.classList.add("answer-wrong");
    }

    setRenderFeedback(true);

    setTimeout(() => {
      setRenderFeedback(false);
      setExerciseIndex((prev) => prev + 1);
      setExercisesHistory([
        ...exercisesHistory,
        {
          _id,
          numberOne: currentExercise.numberOne,
          numberTwo: currentExercise.numberTwo,
          result: currentExercise.result,
          answer: clickedNumber,
          operation: currentExercise.operation,
        },
      ]);
    }, 2000);
  }

  const abfrageHeader = document.querySelector('abfrage-main-header');
  const abfrageHeaderHeight = abfrageHeader?.getBoundingClientRect().height;

  return (
    <section 
      className="abfrage-answers"
      style={{
        height: `calc(100% - ${abfrageHeaderHeight}px)`
      }}
    >
      {answers.map((answer) => (
        <button
          key={answer._id}
          className={
            renderFeedback
              ? answer._id === correctId
                ? "answer-button answer-right"
                : "answer-button"
              : "answer-button"
          }
          disabled={renderFeedback}
          onClick={(event) => handleAnswerClick(event, answer._id)}
        >
          {visualLearning &&
          currentExercise.result >= 0 &&
          currentExercise.result <= 20 ? (
            <AbfrageAntwortenVisual answerNumber={answer.answerNumber} />
          ) : (
            answer.answerNumber
          )}
        </button>
      ))}
    </section>
  );
}
