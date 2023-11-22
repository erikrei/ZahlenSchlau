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
        divisor: 2,
      });
    }
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

app.get("/lists", async (req, res) => {
  let lists;

  try {
    lists = await ExerciseList.find();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json(lists);
});

app.get("/list/:listName", async (req, res) => {
  const listName = req.params.listName;

  const list = await ExerciseList.findOne({ listName });

  res.status(200).json(list.data);
});

// POST: Test für Erstellung einer Aufgabenliste
app.post("/create/list", async (req, res) => {
  const newData = createNewListData(req.body.listName, req.body.data);

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

  const { resultRangeFrom, resultRangeTo, visualLearning, divisor } =
    await getSettingsObject();

  if (operation && operationenStrings.indexOf(operation) !== -1) {
    // return 20 zufällige Aufgaben von gegebener Operation
    exercises = getRandomExercisesFromOperation(
      operation,
      20,
      resultRangeFrom,
      resultRangeTo,
      divisor
    );
  }

  exercises.visualLearning = visualLearning;

  res.status(200).json(exercises);
});

app.get("/exercises/list", async (req, res) => {
  const listName = req.query.listName;

  let list;
  let settings;

  try {
    list = await ExerciseList.findOne({
      listName,
    });

    if (!list) {
      return res
        .status(404)
        .send(
          "Es konnte keine Aufgabenliste mit gegebenem Namen gefunden werden."
        );
    }

    settings = await getSettingsObject();
  } catch (error) {
    console.log(error);
  }

  res.json({
    data: list.data,
    visualLearning: settings.visualLearning,
  });
});

app.delete("/list", async (req, res) => {
  const { listName } = req.body;

  try {
    const response = await ExerciseList.findOneAndDelete({ listName });

    if (!response) {
      return res
        .status(404)
        .send(
          `Aufgabenliste ${listName} konnte nicht gelöscht werden, da sie nicht existiert.`
        );
    }
  } catch (error) {
    console.log(error);
  }

  res.status(200).send(`Aufgabenliste ${listName} erfolgreich gelöscht.`);
});

app.put("/list/listname", async (req, res) => {
  const { listName, newListName } = req.body.data;

  let response;

  try {
    response = await ExerciseList.findOneAndUpdate(
      {
        listName,
      },
      {
        listName: newListName,
      },
      {
        new: true,
      }
    );

    if (!response) {
      return res
        .status(404)
        .send(
          `Aufgabenliste ${listName} konnte nicht umbenannt werden, da sie nicht existiert.`
        );
    }
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 11000) {
      return res
        .status(409)
        .send(
          `Eine andere Aufgabenliste enthält bereits den Namen ${newListName}.`
        );
    }
  }

  res.status(200).json(response);
});

app.put("/list/exercises", async (req, res) => {
  const { listName, data } = req.body.data;
  const newData = createNewListData(listName, data);

  let response;

  try {
    response = await ExerciseList.findOneAndUpdate(
      {
        listName,
      },
      {
        data: newData.data,
      },
      {
        new: true,
      }
    );

    if (!response) {
      return res
        .status(404)
        .send(
          `Aufgabenliste ${listName} konnte nicht modifiziert werden, da sie nicht existiert.`
        );
    }
  } catch (error) {
    console.log(error);
  }

  res.status(200).send(response);
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
  rangeTo,
  divisor
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
        numberOne = getRandomNumBetweenNumbers(1, (rangeFrom + rangeTo) / 2);
        if (numberOne < rangeFrom) {
          numberTwo = getRandomNumBetweenNumbers(
            rangeFrom - numberOne,
            rangeTo - numberOne
          );
        } else numberTwo = getRandomNumBetweenNumbers(1, rangeTo - numberOne);
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
        while (numberOne % divisor !== 0) {
          numberOne = getRandomNumBetweenNumbers(
            rangeFrom * divisor,
            rangeTo * divisor
          );
        }
        numberTwo = divisor;
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

function createNewListData(listName, data) {
  const newData = {};
  newData.listName = listName;

  const dataArray = [];

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

  return newData;
}
