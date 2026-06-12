import { useState, useEffect } from "react";
import StreakCard from "../components/StreakCard";

import XPCard from "../components/XPCard";
import AchievementCard from "../components/AchievementCard";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

function Dashboard() {

const [habits, setHabits] = useState(() => {
  const savedHabits = localStorage.getItem("habits");

  return savedHabits
    ? JSON.parse(savedHabits)
    : [
        { text: "Drink 3L Water", completed: false },
        { text: "Read 20 Pages", completed: false },
        { text: "Workout 30 Minutes", completed: false },
      ];
});

  const [xp, setXp] = useState(() => {
  return Number(localStorage.getItem("xp")) || 2450;
});
const [streak, setStreak] = useState(
  () => Number(localStorage.getItem("streak")) || 12
);

  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {

    if (newHabit.trim() === "") return;

    setHabits([
      ...habits,
      {
        text: newHabit,
        completed: false,
      },
    ]);

    setNewHabit("");
  };

  const deleteHabit = (indexToDelete) => {

    setHabits(
      habits.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };

  const toggleHabit = (index) => {

    const updatedHabits = [...habits];

    const habit = updatedHabits[index];

    if (!habit.completed) {
      setXp((prevXp) => prevXp + 10);
    } else {
      setXp((prevXp) => prevXp - 10);
    }

    habit.completed = !habit.completed;

    setHabits(updatedHabits);
  };
  useEffect(() => {
  localStorage.setItem(
    "habits",
    JSON.stringify(habits)
  );
}, [habits]);

useEffect(() => {
  localStorage.setItem("xp", xp);
}, [xp]);

useEffect(() => {
  localStorage.setItem("streak", streak);
}, [streak]);
useEffect(() => {

  if (habits.length === 0) return;

  const allCompleted = habits.every(
    (habit) => habit.completed
  );

  if (allCompleted) {
    setStreak((prev) => prev + 1);
  }

}, [habits]);

  return (
    <div className="dashboard-page">

      <h1>
        Welcome Back Hasini 👋
      </h1>

      <HabitForm
        newHabit={newHabit}
        setNewHabit={setNewHabit}
        addHabit={addHabit}
      />

<div className="dashboard-grid">

  <XPCard xp={xp} />

  <StreakCard streak={streak} />

  <HabitList
    habits={habits}
    deleteHabit={deleteHabit}
    toggleHabit={toggleHabit}
  />

  <AchievementCard />

</div>

    </div>
  );
}

export default Dashboard;