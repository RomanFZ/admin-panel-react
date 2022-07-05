const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require("path");

const getReceptionsData = (id) => {
    const dataBase = fs.readFileSync(path.resolve(__dirname,"./dbReceptions.json"), {encoding: 'utf8'});
    const norm = JSON.parse(dataBase);
    const findReceptionsUser = (id) => {
        return norm.filter(item => {
            return item.userId === id;
        });
    }
    return findReceptionsUser(id);
}

const getReceptionsAll = () => {
    const dataBase = fs.readFileSync(path.resolve(__dirname,"./dbReceptions.json"), {encoding: 'utf8'});
   return  JSON.parse(dataBase);
}

module.exports.getReceptions = async (req, res) => {
    try {
        const userId = req.query.userId;
        const result = getReceptionsData(userId);
        res.send(result)
    } catch {
        res.status(400).json({ message: 'Ошибка загрузки' })
    }
};

module.exports.createReception = async (req, res) => {
    try {
        const idReception = uuidv4();
        const reception = {
            name: req.body.name, doctor: req.body.doctor, date: req.body.date, complaint: req.body.complaint, id: idReception, userId: req.body.userId
        }
        fs.writeFileSync(path.resolve(__dirname,"./dbReceptions.json"),  JSON.stringify([...getReceptionsAll(), reception]), { encoding: 'utf8' });
        const result = getReceptionsData(req.body.userId);
        res.send(result);
    } catch {
        res.status(433).json({ message: 'Ошибка записи' })
    }
};

module.exports.updateReception = async (req, res) => {
    try {
        console.log(15, req.body.id);
        const updateReception = {
            name: req.body.name,
            doctor: req.body.doctor,
            date: req.body.date,
            complaint: req.body.complaint,
            id: req.body.id,
            userId: req.body.userId
        }
        const deleteOldReception = (id) => {
            const db = getReceptionsAll()
            const reloadDataBase = db.filter(n => n.id !== id);
            fs.writeFileSync(path.resolve(__dirname, "./dbReceptions.json"), JSON.stringify([...reloadDataBase]), {encoding: 'utf8'});
            return reloadDataBase
        }
        deleteOldReception(req.body.id);
        fs.writeFileSync(path.resolve(__dirname,"./dbReceptions.json"),  JSON.stringify([...getReceptionsAll(), updateReception]), { encoding: 'utf8' });
        const result = getReceptionsData(req.body.userId);
        res.send(result);
    } catch {
        res.status(400).json({ message: 'Ошибка записи' })
    }
};

module.exports.deleteReception = async (req, res) => {
    try {
        console.log(1231231231, req.query)
        const id = req.query.id;
        const deleteReception = (id) => {
            const db = getReceptionsAll();
            const reloadDataBase = db.filter(n => n.id !== id);
            fs.writeFileSync(path.resolve(__dirname, "./dbReceptions.json"), JSON.stringify([...reloadDataBase]), {encoding: 'utf8'});
            return reloadDataBase
        }
        deleteReception(id);
        const result = getReceptionsData(req.query.userId)
        res.send(result)
    } catch {
        res.status(400).json({ message: 'Ошибка записи' })
    }
};
