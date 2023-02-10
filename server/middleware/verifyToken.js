const jwt = require("jsonwebtoken");

const getVerifiedToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = getVerifiedToken