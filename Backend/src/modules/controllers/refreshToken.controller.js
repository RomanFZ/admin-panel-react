const jwt = require("jsonwebtoken");
const express = require('express');

module.exports.verifyRefreshToken = (req, res) => {
    const refreshToken =
        req.headers['refresh-token']

    if (!refreshToken) {
        return res.status(405).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_KEY);
        const newAccessToken = jwt.sign(decoded, process.env.TOKEN_KEY);
        const newRefreshToken = jwt.sign(decoded, process.env.TOKEN_KEY);
        const result = {newAccessToken, newRefreshToken}
        res.send(result)
    } catch (err) {
        return res.status(403).send("Invalid refreshToken");
    }
};