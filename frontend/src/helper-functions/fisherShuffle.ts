import { TExerciseAnswers } from "./getAbfrageAntworten";

export function fisherShuffle(arr: TExerciseAnswers[]): TExerciseAnswers[] {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}