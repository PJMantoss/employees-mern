const express = require("express");

// recordRoutes is an instance of the express router.
const recordRoutes = express.Router();

// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.

// dbo will help us connect to the mongoDB db
const dbo = require("../db/connection");

// This helps convert the id from strings to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// This section gets a list of all the records
recordRoutes.route("/record").get((req, res) => {
    let db_connect = dbo.getDb("employees");

    db_connect
        .collection("records")
        .find({})
        .toArray((err, result) => {
            if(err) throw err;
            res.json(result);
        });
});


recordRoutes.route("/record/:id").get((req, res) => {
    let db_connect = dbo.getDb();
});