const express = require("express");

// recordRoutes is an instance of the express router.
const recordRoutes = express.Router();

// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.

// dbo will help us connect to the mongoDB db
const dbo = require("../db/connection");