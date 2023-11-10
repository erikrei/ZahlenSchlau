import React from "react";
import axios from "axios";

import { TClickedExercise } from "../types/types.d";

type TAbfrageContext = {
  exercisesHistory: TClickedExercise[];
  setExercisesHistory: React.Dispatch<React.SetStateAction<TClickedExercise[]>>;
  visualLearning: boolean;
  setVisualLearning: React.Dispatch<React.SetStateAction<boolean>>;
};

const AbfrageContext = React.createContext<TAbfrageContext | null>(null);

export default function AbfrageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [exercisesHistory, setExercisesHistory] = React.useState<
    TClickedExercise[]
  >([]);
  const [visualLearning, setVisualLearning] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/settings")
      .then(({ data }) => setVisualLearning(data.visualLearning));
  }, []);

  return (
    <AbfrageContext.Provider
      value={{
        exercisesHistory,
        setExercisesHistory,
        visualLearning,
        setVisualLearning,
      }}
    >
      {children}
    </AbfrageContext.Provider>
  );
}

export function useAbfrageContext() {
  const context = React.useContext(AbfrageContext);

  if (!context) {
    throw new Error("AbfrageContext muss im AbfrageProvider genutzt werden");
  }

  return context;
}
