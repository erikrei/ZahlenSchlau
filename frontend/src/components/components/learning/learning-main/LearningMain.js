import "./LearningMain.css";

import LearningMainHeader from "../learning-main-header/LearningMainHeader";
import LearningMainExerciseAnswers from "../learning-main-exercise-answers/LearningMainExerciseAnswers";

export default function LearningMain({
  exercise,
  exerciseIndex,
  exerciseAnswers,
  totalExercises,
  handleAnswerClick,
}) {
  return (
    <main className="learning-main">
      <LearningMainHeader
        exercise={exercise}
        exerciseIndex={exerciseIndex}
        totalExercises={totalExercises}
      />
      <LearningMainExerciseAnswers
        exercise={exercise}
        handleAnswerClick={handleAnswerClick}
        exerciseAnswers={exerciseAnswers}
      />
    </main>
  );
}
