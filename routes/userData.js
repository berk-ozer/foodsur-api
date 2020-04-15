const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const User_dietary_restrictions = require('../db/models/User_dietary_restriction')


module.exports = (db) => {

  router.post('/user-preferences', async (req, res) => {
    let { userId, selectedPreferences } = req.body

    const checkUserPreferences = await User_dietary_restrictions(db).findAll({ attribute: ['restriction_id'], raw: true, where: { user_id: userId } })
    const userPreferences = []
    checkUserPreferences.forEach(preference => userPreferences.push(preference.restriction_id))

    selectedPreferences = selectedPreferences.filter(preference => !userPreferences.includes(preference))

    const userData = []
    selectedPreferences.forEach(preference => {
      userData.push({
        user_id: userId,
        restriction_id: preference
      })
    });

    await User_dietary_restrictions(db).bulkCreate(userData)
    res.send('Success')
  })
  return router
}
