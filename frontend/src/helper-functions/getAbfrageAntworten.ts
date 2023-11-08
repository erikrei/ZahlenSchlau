import { v4 as uuidv4 } from 'uuid';

import { fisherShuffle } from './fisherShuffle';

export type TExerciseAnswers = {
    _id: string,
    answerNumber: number
}

export function getAbfrageAntworten(richtigeAntwort: number, antwortenAnzahl: number, abweichung: number): TExerciseAnswers[] {
    let answers: TExerciseAnswers[] = [];
    const minNumber = richtigeAntwort - abweichung;
    const maxNumber = richtigeAntwort + abweichung;

    answers.push({
        _id: uuidv4(),
        answerNumber: richtigeAntwort
    })

    while (answers.length < antwortenAnzahl) {
        let randomNum = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
        if (answers.filter(num => num.answerNumber === randomNum).length === 0) {
            answers.push({
                _id: uuidv4(),
                answerNumber: randomNum
            })
        }
    }

    answers = fisherShuffle(answers);

    return answers;
}