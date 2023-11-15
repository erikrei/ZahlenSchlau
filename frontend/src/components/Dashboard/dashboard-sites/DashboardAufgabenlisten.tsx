import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import { IoMdClose } from "react-icons/io";
import { BiRename } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

import CreateListButton from "../../util/CreateListButton";

import { TExerciseList } from "../../../types/types.d";

export default function DashboardAufgabenlisten() {
  const [exerciseLists, setExerciseLists] = React.useState<
    TExerciseList[] | null
  >(null);

  React.useEffect(() => {
    axios.get("http://localhost:3000/lists").then(({ data }) => {
      setExerciseLists(data);
    });
  }, []);

  function deleteListClick(listName: string) {
    const confirmDeletion = window.confirm(
      `Willst du die Aufgabenliste ${listName} wirklich löschen?`
    );

    if (confirmDeletion) {
      axios
        .delete("http://localhost:3000/list", {
          data: {
            listName,
          },
        })
        .then(({ data }) => {
          toast.success(data);
          exerciseLists &&
            setExerciseLists(
              exerciseLists.filter((list) => list.listName !== listName)
            );
        });
    } else {
      toast.error(`Aufgabenliste ${listName} wurde nicht gelöscht.`);
    }
  }

  function renameListClick(listName: string) {
    const confirmRename = prompt(
      `Gib den neuen Namen der Aufgabenliste ${listName} an.`
    );

    if (confirmRename) {
      axios
        .put("http://localhost:3000/list/listName", {
          data: {
            listName,
            newListName: confirmRename,
          },
        })
        .then(({ data }) => {
          toast.success(
            `Aufgabenliste ${listName} wurde erfolgreich zu ${data.listName} umbenannt.`
          );
          const newExerciseLists = exerciseLists?.map((list) => {
            if (list.listName === listName)
              return {
                ...list,
                listName: data.listName,
              };
            return list;
          });
          exerciseLists &&
            newExerciseLists &&
            setExerciseLists(newExerciseLists);
        })
        .catch((error) => {
          const errorMessage = error.response.data;
          toast.error(errorMessage);
        });
    } else {
      toast.error(`Aufgabenliste ${listName} wurde nicht umbenannt.`);
    }
  }

  return (
    <section className="dashboard-lists-container">
      <CreateListButton />
      <h2>Erstellte Aufgabenlisten</h2>
      {exerciseLists?.length === 0 && (
        <p>
          Keine Aufgabenlisten enthalten. Erstelle zuerst eine Aufgabenliste.
        </p>
      )}
      <div className="dashboard-lists">
        {exerciseLists?.map((list) => (
          <div key={list._id}>
            <div className="list-header">
              <h3>{list.listName}</h3>
              <div className="list-header-options">
                <IoMdClose
                  onClick={() => deleteListClick(list.listName)}
                  className="svg-hover-red"
                />
                <BiRename onClick={() => renameListClick(list.listName)} />
                <Link to={`/create/list?edit=${list.listName}`}>
                  <MdEdit />
                </Link>
              </div>
            </div>
            <Link to={`/abfrage/list?listName=${list.listName}`}>
              Zur Listenabfrage
            </Link>
          </div>
        ))}
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            backgroundColor: "#0d3b66",
            color: "#faf0ca",
          },
        }}
      />
    </section>
  );
}
