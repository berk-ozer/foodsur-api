/*
* All routes for Users are defined here
* Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../models/index');
const getRestrictionObj = require('../helpers/getRestrictionObj');

module.exports = () => {

  router.post("/new", async (req, res) => {
    const {username, email, password} = req.body
    const checkUser = await User.findAll({where: {
      email
    }})

    // If user does not already exist in db, create new user and send their id in response
    if (checkUser.length === 0) {
      const user = await User.create({username, email, password})
        .catch(err => console.log(err));
      console.log('USER ADDED')
      res.send({ success: true, userId: user.dataValues.id})
    } else {
      console.log('USER EXISTS')
      res.send('error: user exists')
    }
  })

  router.post("/login", async (req, res) => {
    const {email} = req.body
    const userInfo = await db.User.findAll({
      raw: true,
      where: {email},
      include: [db.DietaryRestriction]
     });

    // If user exists in db, send back their id and dietary restrictions in response
    if (userInfo.length) {
      const userRestrictions = getRestrictionObj(userInfo);
      res.send({
        success: true,
        userId: userInfo[0].id,
        userRestrictions
      });
    } else {
      res.send('Error')
    }
  })

  return router;
};
