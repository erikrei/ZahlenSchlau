import React from "react";
import axios from "axios";

import { AiFillWarning } from "react-icons/ai";

import { TSettings } from "../../../types/types.d";

export default function DashboardSettings() {
  const [feedback, setFeedback] = React.useState({
    status: "",
    message: "",
    showFeedback: false,
  });

  const [settings, setSettings] = React.useState<TSettings | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name, checked } = event.target;
    const numberValue = Number(value);

    // Wenn numberValue von input[type="number"] kommt und nicht input[type="checkbox"]
    if (numberValue && settings) {
      let isErrorTrue: boolean = false;
      if (name === "resultRangeFrom") {
        isErrorTrue = checkError(numberValue, settings.resultRangeTo);
      } else {
        isErrorTrue = checkError(settings.resultRangeFrom, numberValue);
      }

      if (isErrorTrue) {
        setFeedback({
          ...feedback,
          status: "error",
          message: "Reichweite von darf nicht größer als Reichweite bis sein",
          showFeedback: true,
        });
      } else {
        setFeedback({
          ...feedback,
          status: "",
          message: "",
          showFeedback: false,
        });
      }
      setSettings({
        ...settings,
        [name]: numberValue,
      });
    } else if (!numberValue && name !== 'visualLearning') {
      setFeedback({
        ...feedback,
        status: "error",
        message:
          "Reichweite von und Reichweite bis müssen einen Wert größer als 0 enthalten.",
        showFeedback: true,
      });
      settings &&
        setSettings({
          ...settings,
          [name]: numberValue,
        });
    } else {
      settings &&
        setSettings({
          ...settings,
          [name]: checked,
        });
    }
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
      })
    );
  }, []);

  function checkError(numberOne: number, numberTwo: number): boolean {
    return numberOne >= numberTwo;
  }

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
              <div className="input-container-warning">
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
            onChange={(event) => handleChange(event)}
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
              <div className="input-container-warning">
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
                onChange={(event) => handleChange(event)}
              />
            </label>
            <label htmlFor="resultRangeTo">
              Reichweite bis
              <input
                type="number"
                id="resultRangeTo"
                name="resultRangeTo"
                value={settings?.resultRangeTo || ""}
                onChange={(event) => handleChange(event)}
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
