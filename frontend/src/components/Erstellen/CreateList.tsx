import React from "react";
import "./CreateList.css";

import ErstellteAufgabenProvider from "../../contexts/ErstellteAufgabenContext";

import CreateListSidebar from "./CreateListSidebar";
import CreateListForm from "./CreateListForm";

export default function CreateList() {
  return (
    <ErstellteAufgabenProvider>
      <div className="create-main-container">
        <CreateListSidebar />
        <CreateListForm />
      </div>
    </ErstellteAufgabenProvider>
  );
}
