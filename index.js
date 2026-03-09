const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

/* Prevent caching */
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

/* CONFIG ENDPOINT */
app.get("/config.json", (req, res) => {
  res.sendFile(path.join(__dirname, "config.json"));
});

/* UI */
app.get("/ui", (req, res) => {
  res.sendFile(path.join(__dirname, "public/ui.html"));
});

/* SAVE CONFIGURATION */
app.post("/save", (req, res) => {
  console.log("SAVE Payload:", JSON.stringify(req.body, null, 2));
  res.status(200).send({ success: true });
});

/* VALIDATE */
app.post("/validate", (req, res) => {
  console.log("VALIDATE Payload:", JSON.stringify(req.body, null, 2));
  res.status(200).send({ valid: true });
});

/* EXECUTE */
app.post("/execute", (req, res) => {
  console.log("EXECUTE Payload:", JSON.stringify(req.body, null, 2));
  
  res.status(200).send({
    branchResult: "next"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
