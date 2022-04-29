const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const verifyToken = require("../middleware/verifyToken");


const jwtMaxAge = 3 * 24 * 60 * 60; //3 days
//jwt
const createToken = (id) => {
    return jwt.sign({ id }, 'secret')
};

async function index (req, res) {
    try {
        const result = await User.getAll()
        const users = result.map(u => u.details);
        res.status(200).json(result)    //({ success : true, users : users });
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

// post
async function register(req, res) {
    const { firstname, username, password, email } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);  
        console.log("Normal password is " + password + " Hashed password is " + hashedPassword);
        await User.create({ firstname, username, hashedPassword, email })
        const token = createToken(username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: jwtMaxAge * 1000 }) //3 days
        res.status(201).json({ user: username });
    }
    catch (err) {
        res.status(422).json({ err });
        console.log(err)
    }
}

// post
async function login(req, res) {
    const { email, password } = req.body;
    try {
        // const salt = await bcrypt.genSalt(12);
        // const hashedPassword = await bcrypt.hash(password, salt); 
        // console.log('hashedPassword : ' + hashedPassword)
        const user = await User.login(email, password); 
        const token = createToken(user.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: jwtMaxAge * 1000 }) //3 whole days
        res.status(200).json({ user: user.username })
    } catch (err) {
        console.log(err)
        res.status(422).json({ err });
    }
}

//logout get
async function logout(req, res) {
    //replacing jwt with empty cookie with 1 millisecond expiration
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

//delete
async function deleteUser (req, res) {
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



module.exports = { index, show, register, login, logout, deleteUser };