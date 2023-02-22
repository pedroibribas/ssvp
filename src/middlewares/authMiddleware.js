const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      User.findById(decoded.id, (error, user) => {
        if (!user) {
          res.status(401).send({ message: "o ID fornecido não existe na base de dados" });
        } else if (error) {
          res.status(401).send({
            message: "falha ao encontrar usuário",
            mongooseError: error
          });
        } else {
          req.user = user;
          next();
        }
      });
    } catch (err) {
      res.status(401).send({
        message: "Nenhum usuário encontrado",
        caughtError: err,
      });
    }
  };

  if (!token) {
    res.status(401).send({ message: "Bearer Token não encontrado." });
  };
};

module.exports = { protect };