export function getGermanOperationText(operation) {
  let germanOperation;

  switch (operation) {
    case "addition":
      germanOperation = "Addition";
      break;
    case "subtraction":
      germanOperation = "Subtraktion";
      break;
    case "multiplication":
      germanOperation = "Multiplikation";
      break;
    case "division":
      germanOperation = "Division";
      break;
    default:
      germanOperation = "Falsche Operation angegeben";
  }

  return germanOperation;
}
