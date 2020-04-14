const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const User_dietary_restrictions = require('../db/models/User_dietary_restriction')

// Replace with actual id from cookie
const userId = {
  id: 1,
}

module.exports = (db) => {
  router.post('/user-restrictions', (req, res) => {
    const { selectedPreferences } = req.body

  })
  return router
}
