import LearningDescription from "../learning-description/LearningDescription";
import LearningExercisesHistory from "../learning-exercises-history/LearningExercisesHistory";
import "./LearningSidebar.css";

export default function LearningSidebar({ operation, exercisesHistory }) {
  return (
    <aside className="learning-sidebar">
      <LearningDescription operation={operation} />
      <LearningExercisesHistory
        exercisesHistory={exercisesHistory}
        operation={operation}
      />
    </aside>
  );
}
