import { useState, useEffect } from "react";
import ProgressChart from "../components/ProgressChart";

import XPCard from "../components/XPCard";
import StreakCard from "../components/StreakCard";
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

  const [xp, setXp] = useState(
    () => Number(localStorage.getItem("xp")) || 2450
  );

  const [streak, setStreak] = useState(
    () => Number(localStorage.getItem("streak")) || 12
  );

  const [achievements, setAchievements] = useState([]);

  const [showLevelUp, setShowLevelUp] = useState(false);

  const [newHabit, setNewHabit] = useState("");

  const level = Math.floor(xp / 500) + 1;

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

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

    const unlocked = [];

    if (completedHabits >= 1) {
      unlocked.push("🏆 First Habit Completed");
    }

    if (xp >= 1000) {
      unlocked.push("⭐ Earned 1000 XP");
    }

    if (streak >= 7) {
      unlocked.push("🔥 7 Day Streak");
    }

    setAchievements(unlocked);

  }, [completedHabits, xp, streak]);

  useEffect(() => {

    const savedLevel =
      Number(localStorage.getItem("level")) || level;

    if (level > savedLevel) {

      setShowLevelUp(true);

      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);

    }

    localStorage.setItem(
      "level",
      level
    );

  }, [level]);

  return (
    <div className="dashboard-page">

      {showLevelUp && (
        <div className="level-popup">
          🎉 LEVEL UP!
          <br />
          Level {level}
        </div>
      )}

      <h1>
        Welcome Back Hasini 👋
      </h1>

      <div className="stats-row">

        <div className="stat-box">
          <h3>⭐ XP</h3>
          <p>{xp}</p>
        </div>

        <div className="stat-box">
          <h3>🔥 Streak</h3>
          <p>{streak} Days</p>
        </div>

        <div className="stat-box">
          <h3>🏆 Level</h3>
          <p>{level}</p>
        </div>

        <div className="stat-box">
          <h3>✅ Completed</h3>
          <p>{completedHabits}</p>
        </div>

      </div>

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

        <AchievementCard
          achievements={achievements}
        />

      </div>
      <ProgressChart />

    </div>
  );
}

export default Dashboard;