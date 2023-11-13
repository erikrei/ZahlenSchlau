const { v4 } = require("uuid");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const PORT = 3000;

const ExerciseList = require("./model/exerciseList");
const Settings = require("./model/settings");

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

// Stellt Verbindung zur Datenbank auf
mongoose
  .connect("mongodb://admin:12345@db:27017/exercises-db?authSource=admin")
  .then(async () => {
    console.log("Verbunden mit MongoDB-Datenbank");
    if ((await getSettingsObject()) === undefined) {
      await Settings.create({
        visualLearning: false,
        resultRangeFrom: 10,
        resultRangeTo: 30,
      });
    }
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

// GET: Test fürs Erhalten aller Aufgabenlisten
app.get("/lists", async (req, res) => {
  const lists = await ExerciseList.find();

  res.status(200).json(lists);
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

// GET-REQUEST: Generiert je nach gegebener Anzahl und gegebenen Einstellungen zufällige Aufgaben
app.get("/exercises/random", async (req, res) => {
  let exercises;

  const operation = req.query.type;

  const { resultRangeFrom, resultRangeTo, visualLearning } =
    await getSettingsObject();

  if (operation && operationenStrings.indexOf(operation) !== -1) {
    // return 20 zufällige Aufgaben von gegebener Operation
    exercises = getRandomExercisesFromOperation(
      operation,
      20,
      resultRangeFrom,
      resultRangeTo
    );
  }

  exercises.visualLearning = visualLearning;

  res.status(200).json(exercises);
});

app.get("/exercises/list", async (req, res) => {
  const listName = req.query.listName;

  const list = await ExerciseList.findOne({
    listName,
  });

  const settings = await getSettingsObject();

  res.json({
    data: list.data,
    visualLearning: settings.visualLearning
  });
});

app.get("/settings", async (req, res) => {
  res.status(200).json(await getSettingsObject());
});

app.put("/settings", async (req, res) => {
  const newSettings = req.body;

  try {
    const dbSettings = await getSettingsObject();

    // Ändert Settings mit gegebenem body
    await Settings.findOneAndUpdate(dbSettings, newSettings);
  } catch (error) {
    console.log(error);
  }

  res.status(201).send("Einstellungen wurden erfolgreich gespeichert.");
});

// ------------------------------ PRODUCTION-ROUOTEN --------------------------

// DELETE: Löscht alle Listen aus der 'ExerciseLists'-Collection
app.delete("/delete/lists", async (req, res) => {
  await ExerciseList.deleteMany();

  res.send("Alle Listen erfolgreich gelöscht.");
});

function getRandomNumBetweenNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getSettingsObject() {
  const dbResponse = await Settings.find();
  const settings = dbResponse[0];
  return settings;
}

function getRandomExercisesFromOperation(
  operation,
  length,
  rangeFrom,
  rangeTo
) {
  let generatedExercises = {
    data: [],
  };

  for (let i = 0; i < length; i++) {
    let numberOne;
    let numberTwo;
    let result;

    switch (operation) {
      case "addition":
        numberOne = getRandomNumBetweenNumbers(1, rangeFrom);
        numberTwo = getRandomNumBetweenNumbers(
          rangeFrom - numberOne,
          rangeTo - numberOne
        );
        if (numberOne === rangeFrom && numberTwo === 0) {
          numberOne = rangeFrom - 1;
          numberTwo = 1;
        }
        result = numberOne + numberTwo;
        break;
      case "subtraction":
        numberOne = getRandomNumBetweenNumbers(rangeTo, rangeTo * 2);
        numberTwo = getRandomNumBetweenNumbers(
          numberOne - rangeTo,
          numberOne - rangeFrom
        );
        if (numberOne === rangeTo && numberTwo === 0) {
          numberOne = rangeTo + 1;
          numberTwo = 1;
        }
        result = numberOne - numberTwo;
        break;
      case "multiplication":
        numberOne = getRandomNumBetweenNumbers(2, rangeTo / 2);
        numberTwo = getRandomNumBetweenNumbers(
          Math.ceil(rangeFrom / numberOne),
          Math.floor(rangeTo / numberOne)
        );
        result = numberOne * numberTwo;
        break;
      case "division":
        numberOne = getRandomNumBetweenNumbers(
          rangeFrom * 2,
          rangeFrom * rangeTo
        );
        numberTwo = getRandomNumBetweenNumbers(
          numberOne / rangeTo,
          numberOne / rangeFrom
        );
        result = numberOne / numberTwo;
    }

    generatedExercises.data.push({
      _id: v4(),
      numberOne,
      numberTwo,
      result,
      operation,
    });
  }

  return generatedExercises;
}
