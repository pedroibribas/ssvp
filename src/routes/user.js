const express = require("express");
const { getUser, registerUser } = require("../controllers/user");

const router = express.Router();

router.route("/").post(registerUser);

router.route("/login").post(getUser);

module.exports = router;