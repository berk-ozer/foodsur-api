const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const User_dietary_restrictions = require('../db/models/User_dietary_restriction')
const Favourite = require('../db/models/Favourite')
const User_favourite = require('../db/models/User_favourite')
const db = require('../models/index');

// Replace with actual id from cookie
const userId = {
  id: 2,
}

module.exports = (db) => {

  router.post('/add-favourites', async (req, res) => {
    let { productName, api_id } = req.body
    const checkFavourites = await db.Favourite.findAll({
      raw: true,
      where: { name: productName }
    })

    if (checkFavourites.length === 0) {
      await db.Favourite.create({
        api_id: api_id,
        name: productName
      })
    }



    //   const checkUserFavourites = await User_favourite(db).findAll({
    //     raw: true,
    //     where: {
    //       user_id: userId.id,
    //       api_id: api_id
    //     }
    //   })
    //   if (checkUserFavourites.length === 0) {
    //     await User_favourite(db).create({
    //       user_id: userId.id,
    //       api_id: api_id
    //     })
    //   }
    // })

    // router.get('/user-favourites', async (req, res) => {
    //   const userFavourites = User_favourite(db).findAll({
    //     raw: true, where: {
    //       user_id: userId.id
    //     }
    //   })
    //   console.log(userFavourites)

  });

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
