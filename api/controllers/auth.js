const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const e = require("express");

async function authentication (req, res) {
    try {
        const user = await User.getUserByUsername(req.body.username);

        const authenticated = await bcrypt.compare(req.body.password, user.password);

        if (authenticated) {
            const token = await jwt.sign(user.details,
                                         process.env.JWT_SECRET,
                                         { expiresIn: 60 * 60 });
            res.status(200).send({ success : true, token : "Bearer " + token});
        } else {
            throw { code : 403, message : "Unable to authenticate" };
        }
    } catch (err) {
        if (!err.hasOwnProperty("code")) {
            err = {code : 500, message : err.message }
        }
        res.status(err.code).json({ success : false, message : err.message })
    }
}

module.exports = authentication