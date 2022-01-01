const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" })

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors())

app.use(require("./routes/record"));

//Get driver connection
const dbo = require("./db/connection");

app.use()