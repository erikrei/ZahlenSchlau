import React from "react";
import axios, { Axios, AxiosError } from "axios";

import { Navigate, useSearchParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { TCreatedExercise, TExerciseData } from "../../types";

import { useErstellteAufgabenContext } from "../../contexts/ErstellteAufgabenContext";
import { getOperationSymbol } from "../../helper-functions/getOperationSymbol";

export default function CreateListForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const editListName = searchParams.get("edit");

  const [status, setStatus] = React.useState("normal");
  const [errorMessage, setErrorMessage] = React.useState("");

  const { createdExercises, setCreatedExercises } =
    useErstellteAufgabenContext();

  React.useEffect(() => {
    if (editListName) {
      axios
        .get(`http://localhost:3000/list/${editListName}`)
        .then(({ data }: { data: TExerciseData[] }) => {
          const newDataWithSymbol = data.map((exercise) => {
            return {
              ...exercise,
              operation: getOperationSymbol(exercise.operation),
            };
          });
          setCreatedExercises(newDataWithSymbol);
        });
    }
  }, []);

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
    if (exerciseInput.numberOne === 0 || exerciseInput.numberTwo === 0) {
      setStatus("error");
      setErrorMessage("Überprüfen Sie Ihre Eingaben!");
      return;
    } else {
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
    }
  }

  function saveData() {
    const listNameRegex = new RegExp(/^[-_A-Za-z0-9]+$/);
    let listName = prompt("Wie soll die Aufgabenliste heißen?", "");
    if (listName === null || !listNameRegex.test(listName)) {
      setStatus("error");
      setErrorMessage("Name nicht zulässig.");
      return;
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
      .catch((error: AxiosError) => {
        const httpRequest: XMLHttpRequest = error.request;
        setStatus("error");
        setErrorMessage(httpRequest.responseText);
      });
  }

  function editData() {
    setStatus("sending");
    axios
      .put("http://localhost:3000/list/exercises", {
        data: {
          listName: editListName,
          data: createdExercises,
        },
      })
      .then(({ data }) => {
        setCreatedExercises([]);
        setStatus("success");
        setTimeout(() => {
          setStatus("navigate");
        }, 2000);
      });
  }

  return (
    <main className="create-main">
      {status === "navigate" && <Navigate to="/dashboard" />}
      <h2>
        Aufgaben zur Liste
        {editListName && <span className="edit-list-name">{editListName}</span>}
        hinzufügen
      </h2>
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
            onClick={editListName ? editData : saveData}
          >
            {editListName ? "Liste aktualisieren" : "Liste speichern"}
          </button>
        </div>
      </form>
      {status === "error" && <p className="form-error">{errorMessage}</p>}
      {status === "success" && editListName && (
        <p className="form-feedback">
          Die Liste {editListName} wurde erfolgreich modifiziert. Sie werden zum
          Dashboard weitergeleitet...
        </p>
      )}
      {status === "success" && !editListName && (
        <p className="form-feedback">
          Die Liste wurde erfolgreich erstellt. Sie werden zum Dashboard
          weitergeleitet...
        </p>
      )}
    </main>
  );
}
