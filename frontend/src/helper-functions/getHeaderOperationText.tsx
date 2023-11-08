export function getHeaderOperationText(operation: string): string {
  let operationGermanText = '';
  
  switch (operation) {
    case "addition":
      return operationGermanText = "Addition";
    case "subtraction":
      return operationGermanText = "Subtraktion";
    case "multiplication":
      return operationGermanText = "Multiplikation";
    case "division":
      return operationGermanText = "Division";
  }

  return operationGermanText;
}
