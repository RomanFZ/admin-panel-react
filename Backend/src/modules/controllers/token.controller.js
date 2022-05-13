const jwt = require("jsonwebtoken");
const express = require('express');

module.exports.verifyToken = (req, res, next) => {
    const token =
        req.headers['access-token']
    const refreshToken =
        req.headers['refresh-token']
    console.log('пришел',token)
    try {
        const decoded = jwt.verify(token, 'secret');
        console.log('декодет', decoded)
        next()
        // if (decoded) {
        //     console.log('всё ок')
        //     next()
        // } else {
        //     const decodedRefresh = jwt.verify(refreshToken, process.env.TOKEN_KEY);
        //     if (decodedRefresh) {
        //         console.log('зашло в декодет')
        //         const newAccessToken = jwt.sign(decodedRefresh, process.env.TOKEN_KEY);
        //         const newRefreshToken = jwt.sign(decodedRefresh, process.env.TOKEN_KEY);
        //         req.headers['access-token'] = newAccessToken;
        //         req.headers['refresh-token'] = newRefreshToken;
        //         next();
        //     } else {
        //         console.log('сработала внутри 405')
        //         return res.status(405).send("A token is required for authentication");
        //     }
        // }
    } catch (err) {
        console.log('сработала 405')
        return res.status(405).send("Не валидный токен");
    }
};

// module.exports.verifyRefreshToken = (req, res) => {
//     const refreshToken =
//         req.headers['refresh-token']
//
//     if (!refreshToken) {
//         return res.status(405).send("A token is required for authentication");
//     }
//     try {
//         const decoded = jwt.verify(refreshToken, process.env.TOKEN_KEY);
//         const newAccessToken = jwt.sign(decoded, process.env.TOKEN_KEY);
//         const newRefreshToken = jwt.sign(decoded, process.env.TOKEN_KEY);
//         const result = {newAccessToken, newRefreshToken}
//         res.send(result)
//     } catch (err) {
//         return res.status(403).send("Invalid refreshToken");
//     }
// };
