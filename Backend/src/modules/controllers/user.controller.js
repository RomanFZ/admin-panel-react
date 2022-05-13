const { v4: uuidv4 } = require('uuid');
const User = require('../../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    req.body.id = uuidv4();
    const findUser = await User.findOne({ login });
    if (findUser) {
      return res.status(402).json({ message: 'Пользователь с таким логином существует' })
    }
    const hashPassword = bcrypt.hashSync(password, 5);
    const user = new User({ login, password: hashPassword, id: req.body.id });
    const token = jwt.sign({id : user.id}, process.env.TOKEN_KEY, {expiresIn: "8h"})
    const refreshToken = jwt.sign({id : user.id}, process.env.TOKEN_KEY, {expiresIn: "24h"})
    await user.save();

    const result = {token, refreshToken}
    console.log('123', result)
    return res.send(result)
  } catch {
    res.status(400).json({ message: 'Ошибка регистрации' })
  }
};

module.exports.authorizationUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const userLogin = await User.findOne({ login })
    if (!userLogin) {
      return res.status(402).json({ message: `Пользователя c логином ${login} не существует` });
    }
    const validPassword = bcrypt.compareSync(password, userLogin.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Некорректный пароль' });
    }
    const token = jwt.sign({id : userLogin.id}, process.env.TOKEN_KEY, {expiresIn: "8h"})
    const refreshToken = jwt.sign({id : userLogin.id}, process.env.TOKEN_KEY, {expiresIn: "24h"})
    const result = {token, refreshToken}

    return res.send(result)

  } catch {
    res.status(400).json({ message: 'Ошибка авторизации' })
  }
};


