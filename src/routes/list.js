const express = require("express");
const {
  getLists,
  createList,
  getListById,
  deleteList,
  addDonator,
  deleteDonator,
  deleteDonation,
  addDonation,
  updateList
} = require('../controllers/list');
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect, getLists).post(protect, createList);
router.route('/:id').get(protect, getListById).post(protect, addDonation).put(protect, updateList).delete(protect, deleteList);

router.route('/:id/donations').post(addDonator)
router.route('/:listId/donations/:itemId').delete(protect, deleteDonation);
router.route('/:listId/donations/:itemId/donator').delete(protect, deleteDonator);

module.exports = router;