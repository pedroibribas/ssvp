const asyncHandler = require('express-async-handler');
const List = require("../models/list");

const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });

  const formattedLists = lists.map(list => {
    const items = list.items.map(donation => ({
      id: donation._id,
      title: donation.title,
      donator: donation.donator
    }))

    return ({
      id: list._id,
      manager: list.manager,
      items
    });
  });

  res.status(200).json(formattedLists);
});

const setList = asyncHandler(async (req, res) => {
  const { id } = req.user;

  if (!id) {
    res.status(400);
    throw new Error("No user");
  };

  const { manager, items } = req.body;

  if (!manager || manager === "") {
    res.status(400);
    throw new Error("No manager");
  };

  if (!items) {
    res.status(400);
    throw new Error("No donations");
  };

  let emptyFields = 0;

  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    if (!element.title || element.title === "") {
      emptyFields++
    };
  };

  if (emptyFields > 0) {
    res.status(400);
    throw new Error("Has empty fields");
  };

  const formattedItems = items.map(item => ({
    title: item.title,
    donator: ""
  }));

  const listData = {
    manager: manager || "",
    items: formattedItems,
    user: id
  };

  await List.create(listData);

  res.status(201).json({ message: "List created" });
});

const getList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  const items = list.items.map(donation => ({
    id: donation._id,
    title: donation.title,
    donator: donation.donator
  }));

  const data = {
    id: list._id,
    manager: list.manager,
    items
  };

  res.status(200).json(data);
});

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
  setList,
  getList,
  deleteList,
  addDonation,
  deleteDonation,
  addDonator,
  deleteDonator
};