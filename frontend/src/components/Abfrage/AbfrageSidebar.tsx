import React from "react";

import { useAbfrageContext } from "../../contexts/AbfrageContext";

type TSidebarProps = {
  operation?: string;
  description?: string;
  operationSymbol?: string;
};

export default function AbfrageSidebar({
  operation,
  description,
  operationSymbol,
}: TSidebarProps) {
  const { exercisesHistory } = useAbfrageContext();

  return (
    <aside className="abfrage-sidebar">
      <section className="sidebar-beschreibung">
        <h2>Beschreibung der {operation}</h2>
        <p>{description}</p>
      </section>
      <section className="abfrage-history">
        <h2>Aufgabenverlauf</h2>
        {exercisesHistory.length === 0 && <p>Noch keine Aufgabe beantwortet.</p>}
        {exercisesHistory.map((exercise) => (
          <div
            key={exercise._id}
            className={
              exercise.answer === exercise.result
                ? "history-exercise right"
                : "history-exercise wrong"
            }
          >
            <p>
              {exercise.numberOne}
              {` ${operationSymbol} `}
              {exercise.numberTwo}
              {" = "}
              {exercise.result}
            </p>
            {exercise.answer !== exercise.result && (
              <p>Beantwortet: {exercise.answer}</p>
            )}
          </div>
        ))}
      </section>
    </aside>
  );
}
