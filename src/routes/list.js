const express = require("express");
const {
  getLists,
  setList,
  getList,
  deleteList,
  addDonator,
  deleteDonator,
  deleteDonation,
  addDonation
} = require('../controllers/list');
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect, getLists).post(protect, setList);

router
  .route('/:id')
  .get(getList)
  .post(protect, addDonation)
  .delete(protect, deleteList);

router.route('/:id/donations').post(addDonator)

router
  .route('/:listId/donations/:itemId')
  .delete(protect, deleteDonation);

router
  .route('/:listId/donations/:itemId/donator')
  .delete(protect, deleteDonator);

module.exports = router;