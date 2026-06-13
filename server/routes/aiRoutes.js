const express = require("express");

const router = express.Router();

router.post("/suggest", (req, res) => {

  const { goal } = req.body;

  let suggestions = [];

  if (
    goal.toLowerCase().includes("weight")
  ) {

    suggestions = [
      "Drink 2L Water",
      "Walk 8000 Steps",
      "30 Min Exercise",
      "Sleep Before 11 PM",
    ];

  } else if (
    goal.toLowerCase().includes("study")
  ) {

    suggestions = [
      "Study 1 Hour",
      "Revise Notes",
      "Solve 5 Problems",
      "Read One Chapter",
    ];

  } else if (
    goal.toLowerCase().includes("coding")
  ) {

    suggestions = [
      "Practice React",
      "Solve DSA Problem",
      "Read Tech Article",
      "Build Mini Feature",
    ];

  } 
  else if (
  goal.toLowerCase().includes("eat") ||
  goal.toLowerCase().includes("diet") ||
  goal.toLowerCase().includes("healthy")
) {

  suggestions = [
    "Eat 1 Fruit",
    "Drink 2L Water",
    "Avoid Sugary Drinks",
    "Eat Protein Rich Meal",
  ];

}
 else {

  suggestions = [
    `Work on ${goal} for 30 Minutes`,
    `Read About ${goal} for 15 Minutes`,
    `Complete One Small Task Related to ${goal}`,
    `Track Daily Progress on ${goal}`,
    `Write Down a Goal for ${goal}`,
    `Learn One New Thing About ${goal}`,
    `Review Yesterday's ${goal} Progress`,
    `Stay Consistent with ${goal}`,
    `Reflect on Improvements in ${goal}`,
    `Celebrate a Small Win in ${goal}`,
  ];

}
  res.json(suggestions);

});

module.exports = router;