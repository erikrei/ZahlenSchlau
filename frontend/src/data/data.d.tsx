import { TSidebarLink } from "../types/types.d";
import { FaCirclePlus, FaListUl } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { TLinkInformation } from "../types/types.d";
import { TCardInformation } from "../types/types.d";
import { TSidebarDescription } from "../types/types.d";

export const sidebarLinks: TSidebarLink[] = [
  {
    linkId: 1,
    name: "Grundrechenarten",
    icon: <FaCirclePlus />,
  },
  {
    linkId: 2,
    name: "Aufgabenlisten",
    icon: <FaListUl />,
  },
  {
    linkId: 3,
    name: "Einstellungen",
    icon: <FiSettings />,
  },
];

export const linkDescriptions: TLinkInformation[] = [
  {
    name: "Grundrechenarten",
    description: `Die Grundrechenarten sind die vier grundlegenden mathematischen
    Operationen, die in vielen mathematischen Berechnungen und im Alltag
    verwendet werden. Sie umfassen Addition (Plus rechnen), Subtraktion (Minus rechnen), Multiplikation (Mal rechnen) und
    Division (Durch rechnen).`,
  },
  {
    name: "Aufgabenlisten",
    description: `Willkommen in unserem mathematischen Bereich für eigene Aufgaben und
    Problemlösungen! Hier dreht sich alles um die Welt der Zahlen und
    Mathematik, damit du all deine mathematischen Ideen und
    Herausforderungen im Blick behalten kannst. Jetzt kannst du gleich
    loslegen, all deine mathematischen Herausforderungen zu organisieren und
    deine eigene Sammlung von mathematischen Problemen zu erstellen.`,
  },
  {
    name: "Einstellungen",
    description: `In diesem Bereich kann die Reichweite der Ergebnisse der Aufgaben eingestellt werden. Zusätzlich kannst du entscheiden, ob das visuelle Lernen aktiviert werden soll.`,
  },
];

export const cardItems: TCardInformation[] = [
  {
    id: 1,
    operation: "Addition",
    img: {
      path: require("../assets/dashboard/addition-bg.jpg"),
      alt: "Rechenzähler aus Holz",
    },
    routerPath: "/addition",
  },
  {
    id: 2,
    operation: "Subtraktion",
    img: {
      path: require("../assets/dashboard/subtraction-bg.jpg"),
      alt: "Tafel auf der mathematische Formeln und Kinderzeichnungen sind",
    },
    routerPath: "/subtraction",
  },
  {
    id: 3,
    operation: "Multiplikation",
    img: {
      path: require("../assets/dashboard/multiplication-bg.jpg"),
      alt: "Taschenrechner der auf einem offenem Heft liegt",
    },
    routerPath: "/multiplication",
  },
  {
    id: 4,
    operation: "Division",
    img: {
      path: require("../assets/dashboard/division-bg.jpg"),
      alt: "Andere Tafel mit matehmatischen Symbolen und griechischen Buchstaben",
    },
    routerPath: "/division",
  },
];

export const operationDescriptions: TSidebarDescription[] = [
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
