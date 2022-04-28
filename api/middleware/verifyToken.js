const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/users");
const e = require("express");

// verifies the token?
function verifyToken(req, res, next){

    const header = req.headers['authorization'];

    if (header) {
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            console.log(data);
            if(err){
                res.status(403).json({ success : false,  message: 'Invalid token' })
            } else {
                next();
            }
        })
    } else {
        res.status(403).json({ success: false, message: 'Missing token' })
    }
}

// searches if the cookies user exists?
async function authentication (req, res) {
    try {
        console.log(req.method, req.originalUrl);
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

module.exports = {authentication, verifyToken}