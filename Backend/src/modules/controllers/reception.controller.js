const { v4: uuidv4 } = require('uuid');
const Reception = require('../../models/receptions');
const jwt = require('jsonwebtoken');

module.exports.getReceptions = async (req, res) => {
    try {
        console.log('пришел токен в гет запрос', req.headers['access-token']);
        const token = req.headers['access-token'];
        // const refreshToken = req.headers['refresh-token']
        const userId = jwt.verify(token, process.env.TOKEN_KEY);
        // console.log('id',userId)
        const receptionId = userId.id;
        const result = await Reception.find({userId: receptionId})
        // const response = {result, token, refreshToken}
        console.log(result);
        res.send(result)
    } catch {
        res.status(400).json({ message: 'Ошибка загрузки' })
    }
};

module.exports.createReception = async (req, res) => {
    try {
        req.body.id = uuidv4()
        const {name, doctor, date, complaint, id} = req.body;

        const verifyUserId = jwt.verify(req.headers['access-token'], process.env.TOKEN_KEY);

        const reception = new Reception({
            name: req.body.name, doctor: req.body.doctor, date: req.body.date, complaint: req.body.complaint, id: req.body.id, userId: verifyUserId.id
        })
        await reception.save().then(result => {
            Reception.find({userId: verifyUserId.id}).then(result => {
                res.send(result);
            })
          })

    } catch {
        res.status(433).json({ message: 'Ошибка записи' })
    }
};

module.exports.updateReception = async (req, res) => {
    try {
        const userIda = jwt.verify(req.headers['access-token'], process.env.TOKEN_KEY);
        const verifyUserId = userIda.id
        const {name, doctor, date, complaint, id} = req.body;
        Reception.updateOne({id: id}, {name: name, doctor: doctor, date: date, complaint: complaint}).then(result => {
            Reception.find({userId: verifyUserId}).then(result => {
                res.send(result)
            })
        })
    } catch {
        res.status(400).json({ message: 'Ошибка записи' })
    }
};

module.exports.deleteReception = async (req, res) => {
    try {
        const verifyUserId = jwt.verify(req.headers['access-token'], process.env.TOKEN_KEY);
        Reception.deleteOne({id: req.query.id}).then(result => {
            Reception.find({userId: verifyUserId.id}).then(result => {
                res.send(result);
            })
          })

    } catch {
        res.status(400).json({ message: 'Ошибка записи' })
    }
};
