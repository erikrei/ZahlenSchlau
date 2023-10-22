export function getOperationCharacter(operation) {
  let operationSymbol;

  switch (operation) {
    case "addition":
      operationSymbol = "+";
      break;
    case "subtraction":
      operationSymbol = "-";
      break;
    case "multiplication":
      operationSymbol = "*";
      break;
    case "division":
      operationSymbol = "/";
      break;
    default:
      operationSymbol = "";
  }

  return operationSymbol;
}
