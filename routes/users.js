/*
* All routes for Users are defined here
* Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../db/models/User')

module.exports = (db) => {

  router.post("/new", async (req, res) => {
    const {username, email, password} = req.body
    const checkUser = await User(db).findAll({where: {
      email
    }})
    if (checkUser.length === 0) {
      await User(db).create({username, email, password})
        .catch(err => console.log(err))
      console.log('USER ADDED')
    } else {
      console.log('USER EXISTS')
      res.status(400)
    }


    // const user = await User(db).findAll({where: {
    //   email: 'bort'
    // }})
    // console.log(user.dataValues)
  })

  return router;
};
