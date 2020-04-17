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
  })

  router.get('/user-favourites', async (req, res) => {
    let userFavourites = await db.User.findAll({
      raw: true, include: [{ model: db.Favourite }], where: { id: userId.id }
    })

    const userData = []
    userFavourites.forEach(product => {
      userData.push({
        productName: product['Favourites.name'],
        apiId: product['Favourites.apiId']
      })
    })

    res.send(userData)
  });

  router.get('/popular-products', (req, res) => {
    //UserFavourites => each row is an instance of a user favouriting somehting {userid, favouritesid}
    //Link to favourites table through UserFavourites

    //1)Total the number of times a favourite id appears in the table, 5 to 10 =>  order by count
    //2)Using favourite Id Look up the api_to to make a call and grab diet tags, make an array of tag recieved
    //3)Then use user Id to check that users restricitons, returns an array. (Store on cookie?)
    //4)Filter these arrays against each other => Only return items that match restrictions and api. (Check by length first so we dont filter)
    //5)

  })

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
