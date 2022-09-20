const express = require("express");
const { Server } = require("ws");
const cors = require("cors");

const app = express();
const port = 3001;

const seriesList = require("./responses/series");
const liveScores = require("./responses/liveGenerator");

app.use(cors());

app.get("/series", (req, res) => {
  res.json(seriesList);
});

app.get("/score", (req, res) => {
  res.json(liveScores);
});

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

var wss = new Server({ server: server });

wss.on("connection", (ws) => {
  let gameIncrement = 0;
  ws.send(JSON.stringify(liveScores(0, gameIncrement)));

  setInterval(() => {
    gameIncrement = gameIncrement + 1;
    ws.send(JSON.stringify(liveScores(0, gameIncrement)));
  }, 1000);
});
