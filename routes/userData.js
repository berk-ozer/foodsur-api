const express = require('express');
const router = express.Router();
const db = require('../models/index');

// Replace with actual id from cookie
const userId = {
  id: 2,
}

module.exports = () => {

  router.post('/add-favourites', async (req, res) => {
    let { productName, api_id } = req.body
    const checkFavourites = await db.Favourite.findAll({
      raw: true,
      where: { name: productName }
    })

    if (checkFavourites.length === 0) {
      await db.Favourite.create({
        apiId: api_id,
        name: productName
      })
    }

    const getFavouriteId = await db.Favourite.findAll({ raw: true, where: { apiId: api_id } })

    const checkUserFavourites = await db.UserFavourite.findAll({
      raw: true,
      where: {
        userId: userId.id,
        favouriteId: getFavouriteId[0].id
      }
    })

    if (checkUserFavourites.length === 0) {
      await db.UserFavourite.create({
        userId: userId.id,
        favouriteId: getFavouriteId[0].id
      })
    }

    const test = await db.UserFavourite.findAll({ raw: true, where: { userId: userId.id } })
    console.log(test)
  })

  // router.get('/user-favourites', async (req, res) => {
  //   const userFavourites = User_favourite(db).findAll({
  //     raw: true, where: {
  //       userId: userId.id
  //     }
  //   })
  //   console.log(userFavourites)

  // });

  router.post('/user-preferences', async (req, res) => {
    let { userId, selectedPreferences } = req.body

    const checkUserPreferences = await db.UserDietaryRestriction.findAll({ raw: true, where: { userId: userId } })
    const userPreferences = []
    checkUserPreferences.forEach(preference => userPreferences.push(preference.dietaryRestrictionId))

    selectedPreferences = selectedPreferences.filter(preference => !userPreferences.includes(preference))

    const userData = []
    selectedPreferences.forEach(preference => {
      userData.push({
        userId: userId,
        dietaryRestrictionId: preference
      })
    });
    await db.UserDietaryRestriction.bulkCreate(userData)
    const test = await db.UserDietaryRestriction.findAll({ raw: true, where: { userId } })
    console.log(test)
    res.send('Success')
  })
  return router
}
