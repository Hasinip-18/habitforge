const Habit = require("../models/Habit");

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

    habit.completed =
      !habit.completed;

    await habit.save();

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