const express = require('express');
const router = express.Router();
const db = require('../models/index');
const getRestrictionObj = require('../helpers/getRestrictionObj');


module.exports = () => {

  router.post('/add-favourites', async (req, res) => {
    let { productName, api_id, productTags, userId } = req.body


    const checkFavourites = await db.Favourite.findAll({
      raw: true,
      where: { name: productName }
    })

    if (checkFavourites.length === 0) {
      await db.Favourite.create({
        apiId: api_id,
        name: productName
      })

      const getFavouriteId = await db.Favourite.findAll({ raw: true, where: { name: productName } })

      const getRestrictionTags = await db.DietaryRestriction.findAll({ raw: true, attributes: ['id', 'name'] })

      const formatProductTags = productTags.map(product => {
        return product.split('_').join('-').toLowerCase()
      })

      const formatRestrictionTags = getRestrictionTags.map(tag => {
        const itemName = tag.name.toLowerCase().split(' ')
        if (itemName[1] === 'diet') {
          itemName.pop()
        }
        itemName.join('')
        return { name: itemName[0], id: tag.id }
      })

      const restrictionIds = []

      formatRestrictionTags.forEach(tag => {
        if (formatProductTags.includes(tag.name)) {
          restrictionIds.push(tag.id)
        }
      })

      const favouriteRestrictions = [];

      restrictionIds.forEach(item => {
        favouriteRestrictions.push({
          favouriteId: getFavouriteId[0].id,
          dietaryRestrictionId: item
        })
      })

      await db.FavouriteDietaryRestriction.bulkCreate(favouriteRestrictions)

    }

    const favouriteId = await db.Favourite.findAll({ raw: true, where: { name: productName } })


    const checkUserFavourites = await db.UserFavourite.findAll({
      raw: true,
      where: {
        userId,
        favouriteId: favouriteId[0].id
      }
    })
    console.log(checkUserFavourites)

    if (checkUserFavourites.length === 0) {
      await db.UserFavourite.create({
        userId,
        favouriteId: favouriteId[0].id
      })
      console.log('success')
    }
  })

  router.get('/user-favourites', async (req, res) => {
    let userFavourites = await db.User.findAll({
      raw: true, include: [{ model: db.Favourite }], where: { id: userId }
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


  router.post('/popular-products', async (req, res) => {
    const userId = req.body.id

    const countFavs = await db.UserFavourite.count({ raw: true, attributes: ['favouriteId'], order: ['id', 'ASC'], group: ['UserFavourite.favouriteId'] })


    const orderedFavs =countFavs.sort((a,b) => Number(b.count) - Number(a.count))



  let favsArray = []

  for(fav of orderedFavs){
    favsArray.push(Number(fav.favouriteId))
  }

  const getFavouriteRestrictions = await db.FavouriteDietaryRestriction.findAll({ raw: true, attributes: ["favouriteId", "dietaryRestrictionId"] })

    const favRestrictions = []
  for(fav of favsArray){

    const dietaryRestrictions= []

    for(id of getFavouriteRestrictions) {
      if(fav === id.favouriteId) {
        dietaryRestrictions.push(id.dietaryRestrictionId)
      }
    }
    let currentObject = {
      favouriteId: fav,
      dietaryRestrictions
    }

    favRestrictions.push(currentObject)
  }

  console.log("favRestrictions", favRestrictions)

  const getUserRestrictions= await db.UserDietaryRestriction.findAll({ raw: true, where: { userId }, attributes: ["userId", "dietaryRestrictionId"] })

  const userRestrictions =  []

  getUserRestrictions.forEach(restriction => userRestrictions.push(restriction.dietaryRestrictionId))
  const matchedPopularIds =  []
  for(fav of favRestrictions) {
    const count = fav.dietaryRestrictions.filter(restriction => userRestrictions.includes(restriction))
    if(count.length === userRestrictions.length){
      matchedPopularIds.push(fav.favouriteId)
    }
  }
  console.log('matchedPopularIds', matchedPopularIds);
  })

  // Setting user dietary preferences
  router.post('/user-preferences', async (req, res) => {
    let { userId, selectedPreferences } = req.body

    // Create restrictions for the user, if they don't already have it
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

    // Send back their restrictions in the response
    const userRestrictionInfo = await db.User.findAll({
      raw: true,
      where: { id: userId },
      include: [db.DietaryRestriction]
    });

    const userRestrictions = getRestrictionObj(userRestrictionInfo);
    res.send({
      success: true,
      userRestrictions
    });
  })
  return router
}
