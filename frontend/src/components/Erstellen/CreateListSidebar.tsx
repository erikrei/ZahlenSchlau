import React from "react";
import { Tooltip } from "react-tooltip";

import { MdDeleteOutline } from "react-icons/md";

import { useErstellteAufgabenContext } from "../../contexts/ErstellteAufgabenContext";

export default function CreateListSidebar() {
  const { createdExercises, setCreatedExercises } =
    useErstellteAufgabenContext();

  function removeExercise(exerciseId: string) {
    const newExercises = createdExercises.filter(
      (exercise) => exercise._id !== exerciseId
    );
    setCreatedExercises(newExercises);
  }

  return (
    <aside className="create-sidebar">
      <h2>Erstellte Aufgabenliste</h2>
      {createdExercises.length === 0 && <p>Noch keine Aufgaben hinzugefügt.</p>}
      {createdExercises.length !== 0 && (
        <section className="created-list">
          {createdExercises.map((exercise) => (
            <div className="created-exercise" key={exercise._id}>
              <p>
                <span>{exercise.numberOne}</span>
                <span>{exercise.operation}</span>
                <span>{exercise.numberTwo}</span>
              </p>
              <MdDeleteOutline
                data-tooltip-id="delete-icon-tooltip"
                data-tooltip-content="Aufgabe löschen"
                onClick={() => removeExercise(exercise._id)}
              />
              <Tooltip
                id="delete-icon-tooltip"
                className="delete-tooltip"
                style={{ backgroundColor: "red" }}
              />
            </div>
          ))}
        </section>
      )}
    </aside>
  );
}
