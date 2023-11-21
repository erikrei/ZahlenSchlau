import React from "react";

import { TCreatedExercise } from "../types";

type TErstellteAufgabenContext = {
  createdExercises: TCreatedExercise[];
  setCreatedExercises: React.Dispatch<React.SetStateAction<TCreatedExercise[]>>;
};

const ErstellteAufgabenContext =
  React.createContext<TErstellteAufgabenContext | null>(null);

export default function ErstellteAufgabenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [createdExercises, setCreatedExercises] = React.useState<
    TCreatedExercise[]
  >([]);

  return (
    <ErstellteAufgabenContext.Provider
      value={{ createdExercises, setCreatedExercises }}
    >
      {children}
    </ErstellteAufgabenContext.Provider>
  );
}

export function useErstellteAufgabenContext() {
  const context = React.useContext(ErstellteAufgabenContext);

  if (!context) {
    throw new Error(
      "ErstellteAufgabenContext kann nur im ErstellteAufgabenProvider genutzt werden."
    );
  }

  return context;
}
