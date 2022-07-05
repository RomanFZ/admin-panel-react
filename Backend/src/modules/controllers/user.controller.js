const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require("path");


const getUsers = () => {
  const dataBase = fs.readFileSync(path.resolve(__dirname,"./dbUsers.json"), {encoding: 'utf8'});
  return JSON.parse(dataBase);
}

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    req.body.id = uuidv4();
    const userId = req.body.id;
    const findUser = (loginUser) => {
      const db =  getUsers();
      return db.some(el => {
        return el.login === loginUser;
      });
    }
    const result = findUser(login);

    if (result) {
      return res.status(402).json({ message: 'Пользователь с таким логином существует' })
    }
    const user = {login, password, userId};
    fs.writeFileSync(path.resolve(__dirname,"./dbUsers.json"),  JSON.stringify([...getUsers(), user]), { encoding: 'utf8' });
    return res.send(userId)
  } catch {
    res.status(400).json({ message: 'Ошибка регистрации' })
  }
};

module.exports.authorizationUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const findUserLogin = (userLogin) => {
      const db =  getUsers();
      return db.some(el => {
        return el.login === userLogin;
      });
    }

    const userLogin = findUserLogin(login);
    if (!userLogin) {
      return res.status(402).json({ message: `Пользователя c логином ${login} не существует` });
    }
    const findUserPassword = (pass) => {
      const db = getUsers();
      return db.some(el => {
        return el.password === pass;
      });
    }
    const validPassword = findUserPassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Некорректный пароль' });
    }

    const findUserId = (loginUser) => {
      let userId = '';
      const db = getUsers();
      db.forEach(item => {
        if (item.login === loginUser) {
          userId = item.userId;
        }
      })
      return userId;
    }
    const userId = findUserId(login)
    return res.send(userId)
  } catch {
    res.status(400).json({ message: 'Ошибка авторизации' })
  }
};


