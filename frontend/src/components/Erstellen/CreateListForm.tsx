import React from "react";
import axios from "axios";

import { Navigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { TCreatedExercise } from "../../types/types.d";

import { useErstellteAufgabenContext } from "../../contexts/ErstellteAufgabenContext";

export default function CreateListForm() {
  const [status, setStatus] = React.useState("normal");

  const { createdExercises, setCreatedExercises } =
    useErstellteAufgabenContext();

  const [exerciseInput, setExerciseInput] = React.useState<TCreatedExercise>({
    _id: uuidv4(),
    numberOne: 0,
    numberTwo: 0,
    operation: "+",
  });

  function changeInput(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "numberOne" || name === "numberTwo") {
      setExerciseInput({
        ...exerciseInput,
        [name]: Number(value),
      });
    } else {
      setExerciseInput({
        ...exerciseInput,
        [name]: value,
      });
    }
  }

  function addExercise(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("normal");
    // if (exerciseInput.numberOne === 0 || exerciseInput.numberTwo === 0) {
    //   setStatus("error");
    //   return;
    // }
    // else {
    setCreatedExercises([
      ...createdExercises,
      {
        ...exerciseInput,
        _id: uuidv4(),
      },
    ]);
    setExerciseInput({
      _id: uuidv4(),
      numberOne: 0,
      numberTwo: 0,
      operation: "+",
    });
    // }
  }

  function saveData() {
    let listName = prompt("Wie soll die Aufgabenliste heißen?", "");
    while (listName === "") {
      listName = prompt("Wie soll die Aufgabenliste heißen?", "");
    }
    setStatus("sending");
    axios
      .post("http://localhost:3000/create/list", {
        listName,
        data: createdExercises,
      })
      .then((response) => {
        setCreatedExercises([]);
        setStatus("success");
        setTimeout(() => {
          setStatus("navigate");
        }, 2000);
      })
      .catch((error) => console.log(error));
  }

  return (
    <main className="create-main">
      {status === "navigate" && <Navigate to="/dashboard" />}
      <h2>Aufgaben zur Liste hinzufügen</h2>
      <form onSubmit={(event) => addExercise(event)}>
        <div className="form-label-container">
          <label htmlFor="numberOne" className="input-container">
            Nummer 1
            <input
              type="number"
              id="numberOne"
              name="numberOne"
              value={exerciseInput.numberOne.toString()}
              onChange={(event) => changeInput(event)}
            />
          </label>
          <label htmlFor="numberTwo" className="input-container">
            Nummer 2
            <input
              type="number"
              id="numberTwo"
              name="numberTwo"
              value={Number(exerciseInput.numberTwo).toString()}
              onChange={(event) => changeInput(event)}
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="operation">Rechenart</label>
          <select
            name="operation"
            id="operation"
            onChange={(event) => changeInput(event)}
            value={exerciseInput.operation}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
        </div>
        <div className="form-content-container">
          <button
            type="submit"
            disabled={status !== "normal" && status !== "error"}
          >
            Aufgabe hinzufügen
          </button>
          <button
            type="button"
            disabled={
              createdExercises.length === 0 ||
              (status !== "normal" && status !== "error")
            }
            onClick={saveData}
          >
            Liste speichern
          </button>
        </div>
      </form>
      {status === "error" && (
        <p className="form-error">Überprüfen Sie Ihre Eingaben!</p>
      )}
      {status === "success" && (
        <p className="form-feedback">
          Die Liste wurde erfolgreich erstellt. Sie werden zum Dashboard
          weitergeleitet...
        </p>
      )}
    </main>
  );
}
