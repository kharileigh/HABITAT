const jwt = require("jsonwebtoken");

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

module.exports = verifyToken;