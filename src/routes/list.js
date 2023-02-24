const express = require("express");
const { ListController } = require("../controllers/list");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect, ListController.getLists).post(protect, ListController.createList);

router.route('/:id')
  .get(protect, ListController.getListById)
  .post(protect, ListController.addDonation)
  .put(protect, ListController.updateList)
  .delete(protect, ListController.deleteList);

router.route("/:listId/:donationId").put(protect, ListController.updateDonation).delete(protect, ListController.deleteDonation);

module.exports = router;