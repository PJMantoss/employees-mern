const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
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

// This section gets a single record by id
recordRoutes.route("/record/:id").get((req, res) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id ) };

    db_connect
        .collection("records")
        .findOne(myQuery, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
});

// This section creates a new record in the database
recordRoutes.route("/record/add").post((req, response) => {
    let db_connect = dbo.getDb();
    let myObj = {
        name : req.body.name,
        position : req.body.position,
        level : req.body.level
    };

    db_connect
        .collection("records")
        .insertOne(myObj, (err, result) => {
            if(err) throw err;
            response.json(result);
        });
});

// This section updates a record by id
recordRoutes.route("/update/:id").post((req, response) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id ) };

    let newRecords = {
        $set: {
            name : req.body.name,
            position : req.body.position,
            level : req.body.level
        },
    };

    db_connect
        .collection("records")
        .updateOne(myQuery, newRecords, (err, result) => {
            if(err) throw err;
            console.log("1 document updated")
            response.json(result);
        });
});

//This section deletes a record from the database
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId( req.params.id ) };

    db_connect
        .collection("records")
        .deleteOne(myQuery, (err, obj) => {
            if(err) throw err;
            console.log("1 document deleted")
            response.status(obj);
        });
});

module.exports = recordRoutes;