import React from "react";
import axios from "axios";

import { AiFillWarning } from "react-icons/ai";
import { FaC, FaCircleInfo } from "react-icons/fa6";

import { TSettings } from "../../../types";

export default function DashboardSettings() {
  const [feedback, setFeedback] = React.useState({
    status: "",
    message: "",
    showFeedback: false,
  });

  const [settings, setSettings] = React.useState<TSettings | null>(null);

  function handleVisualLearningChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { checked } = event.target;

    settings &&
      setSettings({
        ...settings,
        visualLearning: checked,
      });
  }

  function handleResultRangeFromChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    const numberValue: number = Number(value);

    settings &&
      setSettings({
        ...settings,
        resultRangeFrom: numberValue,
      });
  }

  function handleResultRangeToChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    const numberValue: number = Number(value);

    settings &&
      setSettings({
        ...settings,
        resultRangeTo: numberValue,
      });
  }

  function handleDivisorChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const numberValue: number = Number(value);

    settings &&
      setSettings({
        ...settings,
        divisor: numberValue,
      });
  }

  function handleExerciseNumberChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    const numberValue: number = Number(value);

    settings &&
      setSettings({
        ...settings,
        exerciseNumber: numberValue,
      });
  }

  function handleClick(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback({
      ...feedback,
      status: "sending",
    });

    axios.put("http://localhost:3000/settings", settings).then(({ data }) =>
      setFeedback({
        ...feedback,
        showFeedback: true,
        message: data,
        status: "success",
      })
    );
  }

  React.useEffect(() => {
    axios.get("http://localhost:3000/settings").then(({ data }) =>
      setSettings({
        visualLearning: data.visualLearning,
        resultRangeFrom: data.resultRangeFrom,
        resultRangeTo: data.resultRangeTo,
        divisor: data.divisor,
        exerciseNumber: data.exerciseNumber,
      })
    );
  }, []);

  React.useEffect(() => {
    if (settings) {
      if (
        settings.divisor <= 1 ||
        settings.resultRangeFrom <= 0 ||
        settings.resultRangeTo <= 0 ||
        settings.exerciseNumber <= 0
      ) {
        setFeedback({
          message: "Überprüfe deine Eingaben.",
          showFeedback: true,
          status: "error",
        });
      } else if (settings.resultRangeFrom >= settings.resultRangeTo) {
        setFeedback({
          message: "Reichweite von muss kleiner sein als Reichweite bis.",
          showFeedback: true,
          status: "error",
        });
      } else {
        setFeedback({
          message: "",
          showFeedback: false,
          status: "",
        });
      }
    }
  }, [settings]);

  return (
    <section className="dashboard-settings-container">
      <form className="settings-form" onSubmit={(event) => handleClick(event)}>
        <div className="input-container">
          <div className="input-description">
            <h2>Visuelles lernen</h2>
            <div className="input-container-description">
              <p>
                Mit dieser Einstellung kannst du bestimmen, ob die
                Antwortmöglichkeiten in einer visuellen Form anstelle von Zahlen
                dargestellt werden sollen.
              </p>
              <div className="input-container-sideinfo warning">
                <AiFillWarning />
                <p>
                  Beachte, dass die visuelle Form nur angezeigt wird, wenn das
                  Ergebnis kleiner gleich 20 ist.
                </p>
              </div>
            </div>
          </div>
          <input
            type="checkbox"
            name="visualLearning"
            checked={settings?.visualLearning || false}
            onChange={(event) => handleVisualLearningChange(event)}
          />
        </div>
        <div className="input-container">
          <div className="input-description">
            <h2>Ergebnisreichweite</h2>
            <div className="input-container-description">
              <p>
                Mit dieser Einstellung kannst du bestimmen in welcher Reichweite
                die Ergebnisse der Aufgaben sein sollen.
              </p>
              <div className="input-container-sideinfo warning">
                <AiFillWarning />
                <p>
                  Beachte, dass sich Aufgaben wiederholen können, wenn die
                  Reichweite zu niedrig ist.
                </p>
              </div>
            </div>
          </div>
          <div className="input-numberfields">
            <label htmlFor="resultRangeFrom">
              Reichweite von
              <input
                type="number"
                id="resultRangeFrom"
                name="resultRangeFrom"
                value={settings?.resultRangeFrom || ""}
                onChange={(event) => handleResultRangeFromChange(event)}
              />
            </label>
            <label htmlFor="resultRangeTo">
              Reichweite bis
              <input
                type="number"
                id="resultRangeTo"
                name="resultRangeTo"
                value={settings?.resultRangeTo || ""}
                onChange={(event) => handleResultRangeToChange(event)}
              />
            </label>
          </div>
        </div>
        <div className="input-container">
          <div className="input-description">
            <h2>Divisor</h2>
            <div className="input-container-description">
              <p>
                Mit dieser Einstellung kannst du bestimmen durch welche Zahl bei
                der Division (geteilt rechnen) geteilt wird.
              </p>
              <div className="input-container-sideinfo information">
                <FaCircleInfo />
                <p>Muss mindestens 2 sein.</p>
              </div>
            </div>
          </div>
          <div className="input-numberfields">
            <label htmlFor="divisor">
              Divisor
              <input
                type="number"
                id="divisor"
                name="divisor"
                value={settings?.divisor || ""}
                onChange={(event) => handleDivisorChange(event)}
              />
            </label>
          </div>
        </div>
        <div className="input-container">
          <div className="input-description">
            <h2>Aufgabenanzahl</h2>
            <div className="input-container-description">
              <p>
                Mit dieser Einstellung kannst du bestimmen wie viele Aufgaben
                bei der Zufallsabfrage gestellt werden sollen.
              </p>
            </div>
          </div>
          <div className="input-numberfields">
            <label htmlFor="exerciseNumber">
              Anzahl
              <input
                type="number"
                id="exerciseNumber"
                name="exerciseNumber"
                value={settings?.exerciseNumber || ""}
                onChange={(event) => handleExerciseNumberChange(event)}
              />
            </label>
          </div>
        </div>
        <button
          disabled={
            feedback.status === "sending" || feedback.status === "error"
          }
        >
          Einstellungen speichern
        </button>
      </form>
      {feedback.showFeedback && (
        <span className={feedback.status === "success" ? "success" : "error"}>
          {feedback.message}
        </span>
      )}
    </section>
  );
}
