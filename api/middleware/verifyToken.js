const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/users");
const e = require("express");

// verifies the token?
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'secret', (err, decodedToken) => {
        if (err) {
          res.redirect('login');
          err.message;
        } /*else {
          console.log(decodedToken);
        }*/
      })
    } else {
      res.redirect('/login');
    }
    next()
  }

// searches if the cookies user exists?
const authentication = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'secret', async (err, decodedToken) => {
        if (err) {
          console.log(err)
          res.locals.user = null;
          next();
        } else {
          console.log(decodedToken)
          res.locals.user = await User.getUserByUsername(decodedToken.id);
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

module.exports = { authentication, requireAuth }