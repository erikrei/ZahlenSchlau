const { v4 } = require("uuid");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const PORT = 3000;
// const PORT = 4200;

const Exercise = require("./model/exercise");
const ExerciseList = require("./model/exerciseList");
const Settings = require('./model/settings');

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
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   next();
// });

// Stellt Verbindung zur Datenbank auf
mongoose
  .connect("mongodb://admin:12345@db:27017/exercises-db?authSource=admin")
  .then(() => console.log("Verbunden mit MongoDB-Datenbank"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

// POST: Test für Erstellung einer Aufgabenliste
app.post("/create/list", async (req, res) => {
  const newData = {};
  newData.listName = req.body.listName;

  const dataArray = [];
  const data = req.body.data;

  for (const currentExercise of data) {
    const { numberOne, numberTwo, operation } = currentExercise;
    let result;
    let newOperation;

    switch (operation) {
      case "+":
        result = numberOne + numberTwo;
        newOperation = "addition";
        break;
      case "-":
        result = numberOne - numberTwo;
        newOperation = "subtraction";
        break;
      case "*":
        result = numberOne * numberTwo;
        newOperation = "multiplication";
        break;
      case "/":
        result = numberOne / numberTwo;
        newOperation = "division";
    }

    dataArray.push({
      numberOne,
      numberTwo,
      operation: newOperation,
      result,
    });
  }

  newData.data = dataArray;

  try {
    const dbResult = await ExerciseList.create(newData);

    return res
      .status(200)
      .send(`Aufgabenliste ${dbResult.listName} wurde erfolgreich erstellt.`);
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case 11000:
        res.status(409).send("Name bereits vergeben.");
    }
  }
});

// GET-REQUEST: Erhält alle Aufgaben von der Datenbank in der 'Exercises'-Collection
app.get("/exercises/random", async (req, res) => {
  let exercises;

  const operation = req.query.type;

  if (operation && operationenStrings.indexOf(operation) !== -1) {
    // return 20 zufällige Aufgaben von gegebener Operation
    exercises = getRandomExercisesFromOperation(operation, 20);
  }

  res.status(200).json(exercises);
});

app.get("/exercises/list", async (req, res) => {
  const listName = req.query.listName;
  const list = await ExerciseList.findOne({
    listName,
  });

  res.json(list.data);
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

app.delete("/delete/lists", async (req, res) => {
  await ExerciseList.deleteMany();

  res.send("Alle Listen erfolgreich gelöscht.");
});

// GET: Test fürs Erhalten aller Aufgabenlisten
app.get("/lists", async (req, res) => {
  const lists = await ExerciseList.find();

  res.status(200).json(lists);
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

function getRandomNumBetweenNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomExercisesFromOperation(operation, length) {
  let generatedExercises = [];
  for (let i = 1; i <= length; i++) {
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
      _id: v4(),
      numberOne,
      numberTwo,
      operation,
      result,
    });
  }
  return generatedExercises;
}
