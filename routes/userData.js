const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const User_dietary_restrictions = require('../db/models/User_dietary_restriction')
const Favourite = require('../db/models/Favourite')
const User_favourite = require('../db/models/User_favourite')


module.exports = (db) => {

  router.post('/add-favourites'), async (req, res) => {
    let {productName, productId} = req.body
    const checkFavourites = await Favourite(db).findAll({
      raw: true,
      where: { name: productName}
    })
    if(checkFavourites.length === 0){
      await Favourite(db).create({
        id: productId,
        name: productName
      })
    }
    const checkUserFavourites = await User_favourite(db).findAll({
      raw: true,
      where: {
        user_id: userId.id,
        product_id: productId
      }
    })
    if(checkUserFavourites.length === 0) {
      await User_favourite(db).create({
        user_id: userId.id,
        product_id: productId
      })
    }

  }

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
