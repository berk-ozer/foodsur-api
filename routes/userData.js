const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const User_dietary_restrictions = require('../db/models/User_dietary_restriction')

// Replace with actual id from cookie
const userId = {
  id: 2,
}

module.exports = (db) => {

  router.post('/user-preferences', async (req, res) => {
    const { selectedPreferences } = req.body

    selectedPreferences.forEach(async preference => {
      await User_dietary_restrictions(db).create({ user_id: userId.id, restriction_id: preference })
    })
    res.send('Success')
  })
  return router
}
