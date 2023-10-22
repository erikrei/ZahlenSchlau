import "./LearningExercisesHistory.css";
import { getOperationCharacter } from "../../../../helper-functions/operation-character";

export default function LearningExercisesHistory({
  exercisesHistory,
  operation,
}) {
  return (
    <section className="learning-exercises-history">
      <h2>Beantwortete Aufgaben</h2>
      {exercisesHistory.length === 0 && <p>Noch keine Fragen beantwortet</p>}

      {exercisesHistory.map((history) => (
        <div
          className={history.result === history.answer ? "right" : "wrong"}
          key={history._id}
        >
          {history.result === history.answer ? (
            <p>
              {history.numberOne} {getOperationCharacter(operation)}{" "}
              {history.numberTwo} {"="} {history.result}
            </p>
          ) : (
            <>
              <p>
                {history.numberOne} {getOperationCharacter(operation)}{" "}
                {history.numberTwo} {"="} {history.result}
              </p>
              <p>Beantwortet: {history.answer}</p>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
