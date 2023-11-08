import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAbfrageContext } from "../../contexts/AbfrageContext";

export default function AbfrageStatistik() {
  const { exercisesHistory } = useAbfrageContext();
  const navigate = useNavigate();

  const rightAnswers = exercisesHistory.filter(
    (exercise) => exercise.answer === exercise.result
  ).length;

  const rightPercent = ((rightAnswers / exercisesHistory.length) * 100).toFixed(
    0
  );

  const falseAnswers = exercisesHistory.filter(
    (exercise) => exercise.answer !== exercise.result
  ).length;

  const falsePercent = ((falseAnswers / exercisesHistory.length) * 100).toFixed(
    0
  );

  return (
    <>
      <h2>Statistiken</h2>
      <table>
        <thead>
          <tr>
            <th>Art</th>
            <th>Anzahl</th>
            <th>in %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Richtig</td>
            <td className="color-green">{rightAnswers}</td>
            <td className="color-green">{rightPercent}%</td>
          </tr>
          <tr>
            <td>Falsch</td>
            <td className="color-red">{falseAnswers}</td>
            <td className="color-red">{falsePercent}%</td>
          </tr>
        </tbody>
      </table>
      <div className="statistik-button-container">
        <button onClick={() => navigate(0)}>Erneute Abfrage</button>
        <Link to="/">Abfrage beenden</Link>
      </div>
    </>
  );
}
