export function getOperationSymbol(operation: string): string {
    let operationSymbol = '';

    switch(operation) {
        case 'addition':
            operationSymbol = '+';
            break;
        case 'subtraction':
            operationSymbol = '-';
            break;
        case 'multiplication':
            operationSymbol = '*';
            break;
        case 'division':
            operationSymbol = '/';
            break;
    }

    return operationSymbol;
}