import { Link } from "react-router-dom";
import './DashboardGrundrechenartenCard.css';

const cards = [
  {
    cardName: "Addition",
    path: "/addition",
    img: {
      path: require("../../../../assets/dashboard/addition-bg.jpg"),
      alt: "Rechenzähler aus Holz",
    },
  },
  {
    cardName: "Subtraktion",
    path: "/subtraction",
    img: {
      path: require("../../../../assets/dashboard/subtraction-bg.jpg"),
      alt: "Tafel auf der mathematische Formeln und Kinderzeichnungen sind",
    },
  },
  {
    cardName: "Multiplikation",
    path: "/multiplication",
    img: {
      path: require("../../../../assets/dashboard/multiplication-bg.jpg"),
      alt: "Taschenrechner der auf einem offenem Heft liegt",
    },
  },
  {
    cardName: "Division",
    path: "/division",
    img: {
      path: require("../../../../assets/dashboard/division-bg.jpg"),
      alt: "Andere Tafel mit matehmatischen Symbolen und griechischen Buchstaben",
    },
  },
];

export default function DashboardGrundrechenartenCard() {
  return (
    <>
      {cards.map((card) => (
        <div className="card" key={card.cardName.toLowerCase()}>
          <h2>{card.cardName}</h2>
          <img src={card.img.path} alt={card.img.alt} />
          <Link to={`/learning${card.path}?type=random`}>Zur Zufallsabfrage</Link>
        </div>
      ))}
    </>
  );
}
