const asyncHandler = require('express-async-handler');
const Donation = require("../models/donation");

const getDonations = asyncHandler(async (req, res) => {
  const donations = await Donation.find();

  const data = donations.map(donation => (
    {
      id: donation._id,
      title: donation.title,
      donator: donation.donator
    }
  ));

  res.status(200).json(data);
});

const setDonations = asyncHandler(async (req, res) => {
  const { donations } = req.body;

  if (!donations) {
    res.status(400);
    throw new Error("No donation");
  }

  donations.forEach(async (item) => {
    const { title } = item;

    await Donation.create({
      title,
      donator: ""
    });
  });

  res.status(201).json({ message: "Donations created" });
});

const deleteDonation = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.body.id);

  if (!donation) {
    res.status(400);
    throw new Error("Donation not found");
  }

  await donation.remove();

  res.status(200).json({ message: "Donation removed" });
});

const addDonator = asyncHandler(async (req, res) => {
  const { name, donations } = req.body

  if (!name || name === "") {
    res.status(400);
    throw new Error("Name is missing");
  };

  const data = await Donation.find();

  let availDonationsNumber = 0;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.donator === "") {
      availDonationsNumber++
    };
  }

  let notCheckedsNumber = 0;
  for (let index = 0; index < donations.length; index++) {
    const element = donations[index];
    if (!element.isChecked) {
      notCheckedsNumber++
    };
  };

  if (availDonationsNumber === notCheckedsNumber) {
    res.status(400);
    throw new Error("No checked data");
  };

  donations.forEach(async (item) => {
    const donation = await Donation.findById(item.id);

    if (item.isChecked && donation.donator === "") {
      console.log(donation.title, donation.donator);
      donation.donator = name;
      donation.save(error => {
        if (error) {
          return res.status(400).json({ error });
        };
      });
    };
  });

  res.status(201).json({ message: `Donator added` });
});

const deleteDonator = asyncHandler(async (req, res) => {
  const donation = await Donation.findById(req.body.id);

  if (!donation) {
    res.status(400);
    throw new Error("Donation not found");
  }

  donation.donator = "";

  donation.save(error => {
    if (error) {
      return res.status(400).json({ error });
    };
  });

  res.status(200).json({ message: `Donator removed` });
});

module.exports = {
  getDonations,
  setDonations,
  deleteDonation,
  addDonator,
  deleteDonator
};