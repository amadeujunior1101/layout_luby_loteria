const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "./")));

app.post("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3333, () => {
  console.log("App listening on port 3333!");
});
