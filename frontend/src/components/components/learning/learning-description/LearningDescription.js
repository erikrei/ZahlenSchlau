import { getGermanOperationText } from "../../../../helper-functions/german-operation-text";
import './LearningDescription.css';

const operationDescriptions = [
  {
    operation: "addition",
    description:
      "Die Addition ist eine mathematische Operation, bei der man zwei oder mehr Zahlen zusammenzählt, um eine Gesamtsumme zu erhalten. Zum Beispiel, wenn du 2 Äpfel hast und 3 weitere Äpfel bekommst, kannst du sie addieren, um insgesamt 5 Äpfel zu haben. Die Addition hilft uns, die Anzahl oder Menge von Dingen zu erhöhen, wenn wir sie zusammenzählen.",
  },
  {
    operation: "subtraction",
    description:
      "Die Subtraktion ist eine mathematische Operation, bei der wir Zahlen verwenden, um etwas wegzunehmen oder zu verringern. Wenn du zum Beispiel 5 Äpfel hast und 2 davon isst, kannst du die Subtraktion verwenden, um herauszufinden, wie viele Äpfel du noch übrig hast. Das Ergebnis ist 3, weil du 2 von den 5 Äpfeln weggenommen hast.",
  },
  {
    operation: "multiplication",
    description:
      "Die Multiplikation ist eine Methode, um schnell viele Male dasselbe zu addieren. Wenn du zum Beispiel 3 Reihen mit je 4 Bonbons hast, kannst du die Multiplikation verwenden, um herauszufinden, wie viele Bonbons du insgesamt hast. Das Ergebnis ist 12, weil du 4 Bonbons in jeder der 3 Reihen hast.",
  },
  {
    operation: "division",
    description:
      "Die Division ist eine mathematische Operation, bei der wir eine Anzahl in gleich große Teile aufteilen. Wenn du zum Beispiel 12 Bonbons hast und sie gleichmäßig auf 3 Freunde aufteilen möchtest, kannst du die Division verwenden, um herauszufinden, wie viele Bonbons jeder bekommt. Das Ergebnis ist 4, weil 12 Bonbons auf 3 Freunde aufgeteilt 4 Bonbons für jeden ergibt.",
  },
];

export default function LearningDescription({ operation }) {
  const operationDescription = operationDescriptions.find(
    (item) => item.operation === operation
  ).description;

  return (
    <section className="learning-description">
      <h2>Beschreibung</h2>
      <p>{operationDescription}</p>
    </section>
  );
}
