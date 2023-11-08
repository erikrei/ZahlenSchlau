import React from "react";
import { linkDescriptions } from "../../data/data.d";
import { FaCircleInfo } from "react-icons/fa6";

import { useActiveLinkContext } from "../../contexts/ActiveLinkContext";

import DashboardGrundrechenarten from "./dashboard-sites/DashboardGrundrechenarten";
import DashboardAufgabenlisten from "./dashboard-sites/DashboardAufgabenlisten";

export default function DashboardMain() {
  const { activeLink } = useActiveLinkContext();

  const linkDescription = linkDescriptions.find(
    (description) => description.name === activeLink
  )?.description;

  return (
    <main className="dashboard-main">
      <section className="dashboard-description-container">
        <h1>{activeLink}</h1>
        <article className="dashboard-description">
          <FaCircleInfo />
          <p>{linkDescription}</p>
        </article>
      </section>
      {activeLink === "Grundrechenarten" && <DashboardGrundrechenarten />}
      {activeLink === "Aufgabenlisten" && <DashboardAufgabenlisten />}
    </main>
  );
}
