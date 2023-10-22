import { useState } from "react";

import "./LearningMainExerciseAnswers.css";

export default function LearningMainExerciseAnswers({
  exercise,
  handleAnswerClick,
  exerciseAnswers,
}) {
  const [disableButtons, setDisableButtons] = useState(false);

  const [rightAnswer, setRightAnswer] = useState(0);

  function handleRightResult(clickedNumber, target) {
    if (clickedNumber !== exercise.result) {
      target.classList.add("wrong");
    }
  }

  function handleClickFunctions(clickedNumber) {
    setDisableButtons(false);
    handleAnswerClick(clickedNumber);
  }

  return (
    <section className="learning-main-answers">
      {exerciseAnswers.length > 0 &&
        exerciseAnswers.map((answer) => (
          <button
            className={
              disableButtons && answer.answer === rightAnswer ? "right" : undefined
            }
            key={answer._id}
            disabled={disableButtons}
            onClick={(event) => {
              const clickedNumber = Number(event.target.innerText);
              handleRightResult(clickedNumber, event.target);
              setDisableButtons(true);
              setRightAnswer(exercise.result);
              setTimeout(() => {
                handleClickFunctions(clickedNumber);
              }, 3000);
            }}
          >
            {answer.answer}
          </button>
        ))}
    </section>
  );
}
