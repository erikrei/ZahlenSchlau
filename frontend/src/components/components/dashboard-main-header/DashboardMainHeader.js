import './DashboardMainHeader.css';

const descriptionList = [
  {
    linkName: "Grundrechenarten",
    description: `Die Grundrechenarten sind die vier grundlegenden mathematischen
        Operationen, die in vielen mathematischen Berechnungen und im Alltag
        verwendet werden. Sie umfassen Addition (Plus rechnen), Subtraktion (Minus rechnen), Multiplikation (Mal rechnen) und
        Division (Durch rechnen).`,
  },
  {
    linkName: "Aufgabenbereich",
    description: `Willkommen in unserem mathematischen Bereich für eigene Aufgaben und
    Problemlösungen! Hier dreht sich alles um die Welt der Zahlen und
    Mathematik, damit du all deine mathematischen Ideen und
    Herausforderungen im Blick behalten kannst. Jetzt kannst du gleich
    loslegen, all deine mathematischen Herausforderungen zu organisieren und
    deine eigene Sammlung von mathematischen Problemen zu erstellen.`,
  },
];

export default function DashboardMainHeader({ activeLink }) {
  const activeLinkDescription = descriptionList.find(
    (listItem) => listItem.linkName === activeLink
  ).description;

  return (
    <header>
      <h1>{activeLink}</h1>
      <p>{activeLinkDescription}</p>
    </header>
  );
}
