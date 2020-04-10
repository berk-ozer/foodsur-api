/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    res.json([
      { id: 1, username: "somebody" },
      { id: 2, username: "somebody_else" }
    ]
    )
  });
  return router;
};
