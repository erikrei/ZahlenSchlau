import React from "react";
import { Link } from "react-router-dom";
import { cardItems } from "../../../data/data.d";

export default function DashboardGrundrechenarten() {
  /*

    INFORMATION

    Division derzeit nicht verfügbar, da im Backend Fehler enthalten sind und somit
    fehlerhafte Aufgaben/Antworten gestellt werden

  */

  return (
    <section className="dashboard-content-container">
      {cardItems.map((card) => (
        <div
          key={card.id}
          className={
            card.operation !== "Division"
              ? "card-container"
              : "card-container disabled"
          }
        >
          <h2>{card.operation}</h2>
          <img src={card.img.path} alt={card.img.alt} />
          {card.operation !== "Division" ? (
            <Link to={`/abfrage${card.routerPath}?query=random`}>
              Zur Zufallsabfrage
            </Link>
          ) : (
            <p className="disabled-info">
              {card.operation} derzeit nicht verfügbar.
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
