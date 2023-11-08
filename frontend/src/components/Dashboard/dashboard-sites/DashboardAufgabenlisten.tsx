import React from "react";
import "./DashboardAufgabenlisten.css";
import { Link } from "react-router-dom";

import { useLoaderData } from "react-router-dom";

import CreateListButton from "../../util/CreateListButton";
import { TExerciseData } from "../../../types/types.d";

type TExerciseList = {
  _id: string;
  listName: string;
  data: TExerciseData[];
};

export default function DashboardAufgabenlisten() {
  const exerciseLists = useLoaderData() as TExerciseList[];

  return (
    <section className="dashboard-lists-container">
      <CreateListButton />
      <h2>Erstellte Aufgabenlisten</h2>
      {exerciseLists.length === 0 && (
        <p>Du musst zuerst eine Aufgabenliste erstellen.</p>
      )}
      <div className="dashboard-lists">
        {exerciseLists.map((list) => (
          <div key={list._id}>
            <h3>{list.listName}</h3>
            <Link to={`/abfrage/list?listName=${list.listName}`}>
              Zur Listenabfrage
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
