import "./LearningMainHeader.css";
import { getOperationCharacter } from "../../../../helper-functions/operation-character";

export default function LearningMainHeader({
  exercise,
  exerciseIndex,
  totalExercises,
}) {
  return (
    <section className="learning-main-header">
      <span>Aktuelle Aufgabe</span>
      <h2>
        {exercise.numberOne} {getOperationCharacter(exercise.operation)}{" "}
        {exercise.numberTwo}
      </h2>
      <p>
        Aufgabe {exerciseIndex + 1} von {totalExercises}
      </p>
    </section>
  );
}
