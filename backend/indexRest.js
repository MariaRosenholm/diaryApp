"use strict";

const http = require("http");
const path = require("path");
const cors = require("cors");

const express = require("express");

const app = express();

const { port, host } = require("./config/config.json");

const Datastorage = require(path.join(
  __dirname,
  "storage",
  "dataAccessLayer.js"
));

const storage = new Datastorage();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/api/diaryEntriesAll", (req, res) =>
  storage
    .getAll(req.body.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.get("/api/allLabelsPerUser", (req, res) =>
  storage
    .getAllLabelsForUser(req.body.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.get("/api/labelsPerDiaryEntry", (req, res) =>
  storage
    .getLabelsPerEntry(req.body.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.post("/api/addUser", (req, res) => {
  const user = req.body;
  storage
    .insertUser(user)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.post("/api/addUserData", (req, res) => {
  const userData = req.body;
  storage
    .insertUserData(userData)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.post("/api/linkUserAndUserData", (req, res) => {
  const Data = req.body;
  storage
    .insertUserAndUserData(Data)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.post("/api/addDiaryEntry", (req, res) => {
  const entry = req.body;
  storage
    .insertDiaryEntry(entry)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.post("/api/addLabel", (req, res) => {
  const Data = req.body;
  storage
    .insertLabel(Data)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

/*
app.put("/api/turtles/:number", (req, res) => {
  const turtle = req.body;
  const number = req.params.number;
  storage
    .update(number, turtle)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.delete("/api/turtles/:number", (req, res) =>
  storage
    .remove(req.params.number)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
); */

app.all("*", (req, res) => res.json("Wrong entry. Try /api/. "));

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
