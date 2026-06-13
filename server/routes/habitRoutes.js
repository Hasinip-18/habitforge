const express = require("express");

const router = express.Router();

const {
  getHabits,
  addHabit,
  deleteHabit,
  toggleHabit,
} = require(
  "../controllers/habitController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.route("/")
  .get(protect, getHabits)
  .post(protect, addHabit);

router.delete(
  "/:id",
  protect,
  deleteHabit
);

router.put(
  "/:id",
  protect,
  toggleHabit
);

module.exports = router;