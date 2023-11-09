import React from "react";
import { Tooltip } from "react-tooltip";
import { FaCircleInfo } from "react-icons/fa6";

import { useSearchParams } from "react-router-dom";

import { useAbfrageContext } from "../../contexts/AbfrageContext";

import DashboardBackButton from "../util/DashboardBackButton";

type THeaderProps = {
  operation?: string;
};

export default function AbfrageHeader({ operation }: THeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { visualLearning, setVisualLearning } = useAbfrageContext();
  const searchParamQuery = searchParams.get("query");

  return (
    <header>
      <DashboardBackButton />
      <section className="header-information-container">
        <div className="header-option-container">
          <input
            type="checkbox"
            id="visual-checkbox"
            checked={visualLearning}
            onChange={() => setVisualLearning(prev => !prev)}
          />
          <label htmlFor="visual-checkbox">Visuelles Lernen</label>
          <FaCircleInfo
            data-tooltip-id="visual-learning-info"
            data-tooltip-content="Wenn die Checkbox gecheckt ist, werden alle Aufgaben, die das Ergebnis von 20 oder kleiner haben, visuell mit Bildern dargestellt."
          />
          <Tooltip id="visual-learning-info" opacity={1} />
        </div>
        <h1>
          Abfrage {operation}
          {searchParamQuery && (
            <span>{searchParamQuery === "random" && "Zufall"}</span>
          )}
        </h1>
      </section>
    </header>
  );
}
