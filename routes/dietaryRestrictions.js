const express = require('express');
const router = express.Router();
const db = require('../models/index');

module.exports = () => {

  router.get("/", async (req, res) => {
    const restrictions = await db.DietaryRestriction.findAll();
    res.send(restrictions);
  })

  return router;
};
