import { v4 as uuidv4 } from "uuid";

export function getExerciseAnswers(correctAnswer) {
  let answersArray = [];
  answersArray.push({
    answer: correctAnswer,
    _id: uuidv4(),
  });
  while (answersArray.length < 4) {
    const min = correctAnswer - 5;
    const max = correctAnswer + 5;
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    if (answersArray.findIndex((answer) => answer.answer === randomNum) === -1)
      answersArray.push({
        answer: randomNum,
        _id: uuidv4(),
      });
    else randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  }

  return answersArray;
}
