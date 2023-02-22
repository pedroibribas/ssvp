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
};

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

const getListById = (req, res) => {
  try {
    List.findById(req.params.id, (error, list) => {
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
};

const updateList = (req, res, next) => {
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
});

const deleteList = asyncHandler(async (req, res) => {
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
});

const deleteDonation = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.listId);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  };

  const isAuthorized = req.user.id === list.user.toString();

  if (!isAuthorized) {
    res.status(401);
    throw new Error('User is not authorized');
  };

  const donation = list.items.id(req.params.itemId);

  if (!donation) {
    res.status(400);
    throw new Error("Donation not found");
  };

  await donation.remove();

  list.save(error => {
    if (error) {
      return res.status(400).json({ error });
    };

    res.status(200).json({ message: "Donation removed" });
  });
});

const addDonator = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  const { name, donations } = req.body

  if (!name || name === "") {
    res.status(400);
    throw new Error("Name is missing");
  };

  let notCheckeds = 0;

  for (let index = 0; index < donations.length; index++) {
    const element = donations[index];
    if (!element.isChecked) {
      notCheckeds++
    };
  };

  if (list.items.length === notCheckeds) {
    res.status(400);
    throw new Error("No checked data");
  };

  let hasDonator = [];

  donations.forEach(async (item) => {
    const donation = list.items.id(item.id);

    if (item.isChecked && donation.donator !== "") {
      hasDonator.push(true);
    };

    if (item.isChecked && donation.donator === "") {
      donation.donator = name;
    };
  });

  if (hasDonator.length > 0) {
    res.status(400);
    throw new Error("Only one donator allowed");
  };

  list.save(error => {
    if (error) {
      return res.status(400).json({ error });
    };

    res.status(201).json({ message: `Donator added` });
  });
});

const deleteDonator = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.listId);

  const isAuthorized = req.user.id === list.user.toString();

  if (!isAuthorized) {
    res.status(401);
    throw new Error('User is not authorized');
  };

  const donation = list.items.id(req.params.itemId);

  if (!donation) {
    res.status(400);
    throw new Error("Donation not found");
  }

  donation.donator = "";

  list.save(error => {
    if (error) {
      return res.status(400).json({ error });
    };
    res.status(200).json({ message: `Donator removed` });
  });
});

module.exports = {
  getLists,
  createList,
  getListById,
  deleteList,
  addDonation,
  deleteDonation,
  addDonator,
  deleteDonator,
  updateList
};