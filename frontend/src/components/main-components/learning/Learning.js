import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getExerciseAnswers } from "../../../helper-functions/get-exercise-answers";
import { fisherShuffle } from "../../../helper-functions/fisher-shuffle";
import axios from "axios";

import MainHeader from "../../main-components/main-header/MainHeader";
import LearningSidebar from "../../components/learning/learning-sidebar/LearningSidebar";
import LearningMain from "../../components/learning/learning-main/LearningMain";

export default function Learning({ operation }) {
  const [searchParam] = useSearchParams();
  // ist für später, wenns noch was anderes außer random gibt (bis jetzt immer 'random')
  const currentLearningType = searchParam.get("type") || "";

  // Enthält die Aufgaben der dargestellten Seite (mit useEffect gefetcht)
  const [exercises, setExercises] = useState([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // Enthält die beantworteten Aufgaben im Array
  const [exercisesHistory, setExercisesHistory] = useState([]);
  // Enthält boolean, ob alle Aufgaben beantwortet wurden
  const [allAnswered, setAllAnswered] = useState(false);

  const currentExercise = exercises[exerciseIndex];
  const totalExercises = exercises.length;
  const exerciseAnswers =
    currentExercise &&
    fisherShuffle(getExerciseAnswers(currentExercise.result));

  function handleAnswerClick(clickedNumber) {
    if (exerciseIndex === totalExercises - 1) {
      setAllAnswered(true);
    } else {
      setExercisesHistory([
        ...exercisesHistory,
        {
          _id: currentExercise._id,
          numberOne: currentExercise.numberOne,
          numberTwo: currentExercise.numberTwo,
          result: currentExercise.result,
          answer: clickedNumber,
        },
      ]);
      setExerciseIndex((prev) => prev + 1);
    }
  }

  useEffect(() => {
    async function getExercises() {
      try {
        const data = await axios.get(
          `http://localhost:3000/exercises?operation=${operation}`
        );
        setExercises(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getExercises();
  }, []);

  return (
    <div className="container">
      <MainHeader headerText={[operation, currentLearningType]} />
      <LearningSidebar
        operation={operation}
        exercisesHistory={exercisesHistory}
      />
      {/* {allAnswered && <h1>Test</h1>} */}
      {exercises.length > 0 && !allAnswered && (
        <LearningMain
          exercise={currentExercise}
          exerciseIndex={exerciseIndex}
          totalExercises={totalExercises}
          handleAnswerClick={handleAnswerClick}
          exerciseAnswers={exerciseAnswers}
        />
      )}
    </div>
  );
}
