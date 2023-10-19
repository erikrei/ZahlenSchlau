const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const PORT = 3000;

const Exercise = require("./model/exercise");
const operationenStrings = [
  "addition",
  "subtraction",
  "multiplication",
  "division",
];
const operationenSymbols = ["+", "-", "*", "/"];

// Erlaubt Anfragen vom Frontend
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

// Stellt Verbindung zur Datenbank auf
mongoose
  .connect("mongodb://admin:12345@db:27017/exercises-db?authSource=admin")
  .then(() => console.log("Verbunden mit MongoDB-Datenbank"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

// POST-REQUEST: Sendet erstellte Aufgabe an die Datenbank
app.post("/add/exercise", async (req, res) => {
  let dataToSave = [];
  let operationBackend = "";
  const data = req.body;

  for (const currentExercise of data) {
    const numberOne = currentExercise.numberOne;
    const numberTwo = currentExercise.numberTwo;
    const operation = currentExercise.operation;
    let result;

    // Wenn bei einer Aufgabe eine Nummer fehlt
    if (!numberOne || !numberTwo) {
      return res
        .status(400)
        .send("Bei mindestens einer Aufgabe fehlt mindestens eine Nummer.");
    }

    // Wenn die Rechenoperation nicht +, -, * oder / ist
    if (!operationenSymbols.includes(operation)) {
      return res
        .status(400)
        .send("Mindestens eine Aufgabe enthält eine ungültige Operation");
    }

    switch (operation) {
      case "+":
        result = numberOne + numberTwo;
        operationBackend = "addition";
        break;
      case "-":
        result = numberOne - numberTwo;
        operationBackend = "subtraction";
        break;
      case "*":
        result = numberOne * numberTwo;
        operationBackend = "multiplication";
        break;
      case "/":
        result = numberOne / numberTwo;
        operationBackend = "division";
        break;
    }

    dataToSave.push({
      numberOne,
      numberTwo,
      operation: operationBackend,
      result,
    });
  }

  await Exercise.insertMany(dataToSave);

  res.status(201).send("Aufgaben wurden erfolgreich gespeichert");
});

// GET-REQUEST: Erhält alle Aufgaben von der Datenbank in der 'Exercises'-Collection
app.get("/exercises", async (req, res) => {
  let exercises;
  const operation = req.query.operation;

  if (operation && operationenStrings.indexOf(operation) !== -1) {
    exercises = await Exercise.find({
      operation,
    });
  } else {
    exercises = await Exercise.find();
  }

  res.json(exercises);
});

// ------------------------------ PRODUCTION-ROUOTEN --------------------------

// POST: Generiert 50 zufällige Aufgaben in der Datenbank
app.post("/exercises/generate", async (req, res) => {
  let generatedExercises = [];

  for (let i = 1; i <= 50; i++) {
    const operation =
      operationenStrings[
        getRandomNumBetweenNumbers(0, operationenStrings.length - 1)
      ];
    const numberOne =
      operation === "multiplication"
        ? getRandomNumBetweenNumbers(1, 10)
        : getRandomNumBetweenNumbers(1, 30);
    const numberTwo =
      operation === "multiplication"
        ? getRandomNumBetweenNumbers(1, 10)
        : getRandomNumBetweenNumbers(1, 30);
    let result;
    switch (operation) {
      case "addition":
        result = numberOne + numberTwo;
        break;
      case "subtraction":
        result = numberOne - numberTwo;
        break;
      case "multiplication":
        result = numberOne * numberTwo;
        break;
      case "division":
        result =
          numberOne > numberTwo ? numberOne / numberTwo : numberTwo / numberOne;
        result = Number(result.toFixed(2));
    }

    generatedExercises.push({
      numberOne,
      numberTwo,
      operation,
      result,
    });
  }

  await Exercise.insertMany(generatedExercises);

  res.send("Es wurden erfolgreich 50 zufällige Aufgaben erstellt.");
});

// DELETE: Löscht alle Aufgaben aus der 'Exercises'-Collection
app.delete("/delete/exercises", async (req, res) => {
  await Exercise.deleteMany();

  return res.send("Alle Aufgaben erfolgreich gelöscht");
});

function getRandomNumBetweenNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
