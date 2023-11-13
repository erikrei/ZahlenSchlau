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

  function setHistoryHeight(): string {
    let historyMaxHeight = "";

    const screenHeight = document
      .querySelector("body")
      ?.getBoundingClientRect().height;

    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height;

    const sidebarDescription = document.querySelector(
      "section.sidebar-beschreibung"
    );
    const sidebarDescriptionHeight =
      sidebarDescription?.getBoundingClientRect().height;

    if (screenHeight && headerHeight) {
      sidebarDescriptionHeight
        ? (historyMaxHeight = `${
            screenHeight - headerHeight - sidebarDescriptionHeight
          }px`)
        : (historyMaxHeight = `${screenHeight - headerHeight}px`);
    }

    return historyMaxHeight;
  }

  return (
    <aside className="abfrage-sidebar">
      {description && (
        <section className="sidebar-beschreibung">
          <h2>Beschreibung der {operation}</h2>
          <p>{description}</p>
        </section>
      )}
      <section
        className="abfrage-history"
        style={{ maxHeight: setHistoryHeight() }}
      >
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
