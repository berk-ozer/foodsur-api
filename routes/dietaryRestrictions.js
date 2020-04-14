const express = require('express');
const router = express.Router();
const Dietary_restriction = require('../db/models/Dietary_restriction')

module.exports = (db) => {

  router.get("/", async (req, res) => {
    const restrictions = await Dietary_restriction(db).findAll();
    res.send(restrictions);
  })

  return router;
};
