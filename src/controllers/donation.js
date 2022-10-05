const asyncHandler = require('express-async-handler');
const Donation = require("../models/donation");

const getDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find();
  res.status(200).json(donations);
});

const setDonation = asyncHandler(async (req, res) => {
  if (!req.donation) {
    res.status(400);
    throw new Error("Fields missing");
  };

  await Donation.create({ name: req.name });

  res.status(201).json({ message: "New donation created" });
});

const addDonator = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.params.id);

  if (!req.name || !req.phone) {
    res.status(400);
    throw new Error("Fields missing");
  };

  if (donation.donator.length !== 0) {
    res.status(400);
    throw new Error("Donator exists");
  };

  const data = {
    name: req.name,
    phone: req.phone
  };

  donation.donator.push(data);

  donation.amount = 0;

  donation.save(error => {
    if (error) {
      return res.status(400).json({ error });
    };

    res.status(201).json({ message: "Donator added" });
  });
});

module.exports = {
  getDonations,
  setDonation,
  addDonator
};