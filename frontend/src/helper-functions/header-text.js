import { getGermanOperationText } from '../helper-functions/german-operation-text';

export function getRightHeaderText(textArr) {
	const [operation, type] = textArr;
	let textToReturn = type === 'random' ? getGermanOperationText(operation) + " Zufallsabfrage" : "ListenHeader @TODO"

    return textToReturn;

}