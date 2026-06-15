const Habit = require("../models/Habit");
const User = require("../models/User");

const getHabits = async (req, res) => {
  try {

    const habits = await Habit.find({
      user: req.user.id,
    });

    res.json(habits);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const addHabit = async (req, res) => {
  try {

const habit = await Habit.create({
  user: req.user.id,
  text: req.body.text,
  category: req.body.category,
});
    res.status(201).json(habit);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const deleteHabit = async (req, res) => {

  try {

    const habit =
      await Habit.findById(
        req.params.id
      );

    if (!habit) {

      return res.status(404).json({
        message: "Habit not found",
      });

    }

    await Habit.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Habit deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
const toggleHabit = async (req, res) => {

  try {

    const habit =
      await Habit.findById(
        req.params.id
      );

    if (!habit) {

      return res.status(404).json({
        message: "Habit not found",
      });

    }

if (!habit.completed) {

  habit.completed = true;
  habit.completedDate = new Date();

} else {

  habit.completed = false;
  habit.completedDate = null;

}

    await habit.save();
    const user = await User.findById(
  req.user.id
);

if (habit.completed) {

  const today = new Date();

  const lastDate =
    user.lastCompletedDate;

  if (!lastDate) {

    user.streak = 1;

  } else {

    const diffDays = Math.floor(
      (today - lastDate) /
      (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {

      user.streak += 1;

    } else if (
      diffDays > 1
    ) {

      user.streak = 1;

    }

  }

  user.lastCompletedDate =
    today;

  await user.save();

}

    res.json(habit);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getHabits,
  addHabit,
  deleteHabit,
  toggleHabit,
};