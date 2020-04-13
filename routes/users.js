/*
* All routes for Users are defined here
* Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../db/models/User')



module.exports = (db) => {
  router.post("/new", (req, res) => {
    const { username, email, password } = req.body;
    User(db).create({username, email, password});
  })
  return router;
};
