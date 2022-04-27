const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const verifyToken = require("../middleware/verifyToken");

async function index (req, res) {
    try {
        const result = await User.getAll()
        const users = result.map(u => u.details);
        res.status(200).json({ success : true, users : users });
    } catch (err) {
        res.status(500).json({ success : false, message : err.message });
    }
}

async function show (req, res) {
    try {
        const user = await User.getUserByUsername(req.params.username);
        res.status(200).json({ success : true, user : user.details })
    } catch (err) {
        if (!err.hasOwnProperty("code")) {
            err = {code : 500, message : err.message }
        }
        res.status(err.code).json({ success : false, message : err.message })
    }
}

async function create (req, res) {
    try {
        // username & password are absolutely required
        if (!req.body.username || !req.body.password) {
            throw { code: 400, message: "Insufficient information provided to create account"}
        }

        const hashed = await bcrypt.hash(req.body.password,
                                         parseInt(process.env.BCRYPT_SALT_ROUNDS));
        const user = await User.create({ ...req.body, password: hashed, role: "user" });
        res.status(201).json({ success : true, user : user.details });
    } catch (err) {
        res.status(err.code).json({ success : false, message : err.message })
    }
}

async function destroy (req, res) {
    try {
        const token = header["authorization"].split(" ")[1];
        const payload = jwt.decode(token);

        if (!payload.role == "admin" || !payload.username == req.body.username) {
            throw { code : 403, message : "Insufficient permissions to delete account" };
        } else {

            const result = User.deleteUserByUsername(req.body.username);

            if (result.rows.length != 1) {
                throw { code : 404, message : "No matching user to delete" };
            }

            res.send(200).json({ success : true, deleted : user})

        }
        
    } catch (err) {
        if (!err.hasOwnProperty("code")) {
            err = {code : 500, message : err.message }
        }
        res.status(err.code).json({ success : false, message : err.message });
    }
}



module.exports = { index, show, create, destroy };