const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const List = require("../models/list");

const getLists = (req, res, next) => {
  try {
    List.find({ user: req.user }, (error, lists) => {
      if (error) {
        res.status(400).send({ message: "Erro na base de dados", error: error.message });
      } else {
        res.status(200).json({ message: "Sucesso", data: lists });
      }
    });
  } catch (error) {
    next(error);
  }
}

const createList = (req, res, next) => {
  try {
    const list = new List({ ...req.body, user: req.user.id });
    list.save((error) => {
      if (error) {
        res.status(400).send({ message: "Erro na base de dados", error: error.message });
      } else {
        res.status(201).send({ message: "Lista criada" });
      }
    })
  } catch (err) {
    next(err);
  }
}

const getListById = (req, res, next) => {
  validateObjectId(req.params.id);
  try {
    List.findById(req.params.id, (error, list) => {
      if (error) {
        req.status(400).send({ message: "Erro na base de dados", error: error.message });
      } else if (!list) {
        res.status(400).send({ message: "Nenhuma lista encontrada pelo ID fornecido" });
      } else {
        res.status(200).json(list);
      }
    });
  } catch (err) {
    next(err);
  }
}

const getUserListById = (req, res, next) => {
  validateObjectId(req.params.id);
  try {
    List.findById(req.params.id,
      (error, list) => {
        if (error) {
          req.status(400).send({ message: "Erro na base de dados", error: error.message });
        } else if (!list) {
          res.status(400).send({ message: "Nenhuma lista encontrada pelo ID fornecido" });
        } else if (list.user.toString() !== req.user.id) {
          res.status(401).send({ message: "Usuário não autorizado" });
        } else {
          res.status(200).json(list);
        }
      });
  } catch (err) {
    next(err);
  }
}

const updateList = (req, res, next) => {
  validateObjectId(req.params.id);
  if (req.body.items) {
    res.status(400).send({ status: "Erro", message: "Operação para atualizar doações não permitida" });
  } else {
    List.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, list) => {
      try {
        if (!list) {
          res.status(400).send({ message: "Lista não encontrada", error: error.message });
        } else if (list.user.toString() !== req.user.id) {
          res.status(401).send({ message: "Usuário não autorizado" });
        } else if (error) {
          res.status(400).send({ message: "Erro na base de dados", error: error.message });
        } else {
          res.status(200).send({ message: "Lista atualizada" });
        }
      } catch (err) {
        next(err);
      }
    })
  }
}

const addDonation = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const list = await List.findById(req.params.id);

  const isAuthorized = req.user.id === list.user.toString();

  if (!isAuthorized) {
    res.status(401);
    throw new Error('User is not authorized');
  };

  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("No title");
  }

  list.items.push({ title, donator: "" });

  list.save(error => {
    if (error) {
      return res.status(400).json({ error });
    };

    res.status(201).json({ message: "Donation added" });
  });
})

const updateDonation = (req, res, next) => {
  validateObjectId(req.params.listId);
  validateObjectId(req.params.donationId);
  try {
    List.findOneAndUpdate({
      "id": req.params.listId,
      "items._id": req.params.donationId
    }, {
      "$set": {
        "items.$.title": req.body.title,
        "items.$.donator": req.body.donator
      }
    }, (err, parent) => {
      if (!parent) {
        res.status(400).send({ message: "Nenhuma lista encontrada" });
      } else if (parent.user.toString() !== req.user.id) {
        res.status(401).send({ message: "Usuário não autorizado" });
      } else if (err) {
        res.status(400).send({ message: "Erro na base de dados", error: err.message });
      } else {
        res.status(201).send({ message: "Doação atualizada" });
      }
    });
  } catch (error) {
    next(error);
  }
}

const updateDonator = (req, res, next) => {
  validateObjectId(req.params.listId);
  validateObjectId(req.params.donationId);
  try {
    List.findOneAndUpdate({
      "id": req.params.listId,
      "items._id": req.params.donationId
    }, {
      "$set": {
        "items.$.donator": req.body.donator
      }
    }, (err, parent) => {
      if (!parent) {
        res.status(400).send({ message: "Nenhuma lista encontrada" });
      } else if (err) {
        res.status(400).send({ message: "Erro na base de dados", error: err.message });
      } else {
        res.status(201).send({ message: "Doação atualizada" });
      }
    });
  } catch (error) {
    next(error);
  }
}

const deleteDonation = (req, res) => {
  validateObjectId(req.params.listId);
  validateObjectId(req.params.donationId);
  try {
    List.findById(req.params.listId, (error, list) => {
      if (error) {
        req.status(400).send({ message: "Erro MongoDb - Find", error: error.message });
      } else if (!list) {
        res.status(400).send({ message: "Nenhuma lista encontrada na base de dados para a doação selecionada" });
      } else if (list.user.toString() !== req.user.id) {
        res.status(401).send({ message: "Usuário não autorizado" });
      } else {
        list.items.id(req.params.donationId).remove((err) => {
          if (err) {
            res.status(400).send({ message: "Erro MongoDb - Remove", error: err.message });
          }
        });
        list.save((err) => {
          if (err) {
            res.status(400).send({ message: "Erro MongoDb - Save", error: err.message });
          }
        });
        res.status(200).json({ message: "Doação removida" });
      }
    });
  } catch (err) {
    next(err);
  }
}

const deleteList = asyncHandler(async (req, res) => {
  validateObjectId(req.params.id);

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  const isAuthorized = req.user.id === list.user.toString();

  if (!isAuthorized) {
    res.status(401);
    throw new Error('User is not authorized');
  };

  await list.remove();

  res.status(200).json({ message: "List removed" });
})

const validateObjectId = (objectId) => {
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    throw new Error("Mongoose ObjectId inválido");
  }
}

const ListController = {
  getLists,
  createList,
  getUserListById,
  getListById,
  updateList,
  updateDonator,
  addDonation,
  updateDonation,
  deleteDonation,
  deleteList
};

module.exports = { ListController };