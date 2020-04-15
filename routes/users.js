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

    // If user does not already exist in db, create new user and send their id in response
    if (checkUser.length === 0) {
      const user = await User(db).create({username, email, password})
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
    const user = await User(db).findAll({where: {email}})

    // If user exists in db, send back their id in response
    if (user.length === 1) {
      res.send({ success: true, userId: user[0].dataValues.id});
    } else {
      res.send('Error')
    }
  })

  return router;
};
