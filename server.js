const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

console.log(process.env.DATABASE_URL);
const db = mysql.createConnection(process.env.DATABASE_URL);


const app = express();

app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("connected");
});

app.get("/korisnici", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json(result);
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server je pokrenut!!!!"));
