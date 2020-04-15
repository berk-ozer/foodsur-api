const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const User_dietary_restrictions = require('../db/models/User_dietary_restriction')

// Replace with actual id from cookie
const userId = {
  id: 1,
}

module.exports = (db) => {

  router.post('/user-preferences', async (req, res) => {
    let { selectedPreferences } = req.body

    const checkUserPrefrences = await User_dietary_restrictions(db).findAll({ attribute: ['restriction_id'], raw: true, where: { user_id: 1 } })
    const userPreferences = []
    checkUserPrefrences.forEach(preference => userPreferences.push(preference.restriction_id))

    selectedPreferences = selectedPreferences.filter(preference => !userPreferences.includes(preference))

    const userData = []
    selectedPreferences.forEach(preference => {
      userData.push({
        user_id: userId.id,
        restriction_id: preference
      })
    });

    await User_dietary_restrictions(db).bulkCreate(userData)
    res.send('Success')
  })
  return router
}
