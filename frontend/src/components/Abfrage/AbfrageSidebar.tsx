import React from "react";

import { useAbfrageContext } from "../../contexts/AbfrageContext";

import { getOperationSymbol } from "../../helper-functions/getOperationSymbol";

type TSidebarProps = {
  operation?: string;
  description?: string;
};

export default function AbfrageSidebar({
  operation,
  description,
}: TSidebarProps) {
  const { exercisesHistory } = useAbfrageContext();

  return (
    <aside className="abfrage-sidebar">
      {description && (
        <section className="sidebar-beschreibung">
          <h2>Beschreibung der {operation}</h2>
          <p>{description}</p>
        </section>
      )}
      <section className="abfrage-history">
        <h2>Aufgabenverlauf</h2>
        {exercisesHistory.length === 0 && (
          <p>Noch keine Aufgabe beantwortet.</p>
        )}
        {exercisesHistory.map((exercise, index) => (
          <div
            key={exercise._id}
            className={
              exercise.answer === exercise.result
                ? "history-exercise right"
                : "history-exercise wrong"
            }
          >
            <p>{`${index + 1}.`}</p>
            <div className="history-exercise-data">
              <p>
                {exercise.numberOne}
                {` ${getOperationSymbol(exercise.operation)} `}
                {exercise.numberTwo}
                {" = "}
                {exercise.result}
              </p>
              {exercise.answer !== exercise.result && (
                <p>Beantwortet: {exercise.answer}</p>
              )}
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}
