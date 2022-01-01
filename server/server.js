const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(require("./routes/record"));

//Get driver connection
const dbo = require("./db/connection");

app.listen(port, () => {
    //perform a db connection when server starts
    dbo.connectToServer(err => {
        if(err) console.err(err)
    });

    console.log(`Server is running on port: ${port}`);
});