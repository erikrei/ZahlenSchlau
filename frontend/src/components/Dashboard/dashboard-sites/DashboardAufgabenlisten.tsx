import React from "react";
import "./DashboardAufgabenlisten.css";

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
      <h2>Erstelle Aufgabenlisten</h2>
      <div className="dashboard-lists">
        {exerciseLists.map((list) => (
          <div key={list._id}>
            <h3>{list.listName}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
