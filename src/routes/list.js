const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { ListController } = require("../controllers/list");

const router = express.Router();

router.route('/auth')
  .get(protect, ListController.getLists)
  .post(protect, ListController.createList);

router.route('/auth/:id')
  .get(protect, ListController.getUserListById)
  .post(protect, ListController.addDonation)
  .put(protect, ListController.updateList)
  .delete(protect, ListController.deleteList);

router.route("/auth/:listId/:donationId")
  .put(protect, ListController.updateDonation)
  .delete(protect, ListController.deleteDonation);

router.route('/:id')
  .get(ListController.getListById);

router.route("/:listId/:donationId")
  .put(ListController.updateDonator);

module.exports = router;