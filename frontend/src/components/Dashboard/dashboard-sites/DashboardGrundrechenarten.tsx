import React from "react";
import { Link } from "react-router-dom";
import { cardItems } from "../../../data/data.d";

export default function DashboardGrundrechenarten() {
  return (
    <>
      {cardItems.map((card) => (
        <div key={card.id} className="card-container">
          <h2>{card.operation}</h2>
          <img src={card.img.path} alt={card.img.alt} />
          <Link to={`${card.routerPath}?query=random`}>Zur Zufallsabfrage</Link>
        </div>
      ))}
    </>
  );
}