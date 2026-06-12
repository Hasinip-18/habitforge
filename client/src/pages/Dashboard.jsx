import { useState } from "react";

import XPCard from "../components/XPCard";
import AchievementCard from "../components/AchievementCard";

import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";

function Dashboard() {

  const [habits, setHabits] = useState([
    "Drink 3L Water",
    "Read 20 Pages",
    "Workout 30 Minutes",
  ]);

  const [newHabit, setNewHabit] = useState("");

  const addHabit = () => {

    if (newHabit.trim() === "") return;

    setHabits([...habits, newHabit]);

    setNewHabit("");
  };

  const deleteHabit = (indexToDelete) => {

    setHabits(
      habits.filter(
        (_, index) => index !== indexToDelete
      )
    );
  };

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

        <XPCard />

        <HabitList
          habits={habits}
          deleteHabit={deleteHabit}
        />

        <AchievementCard />

      </div>

    </div>
  );
}

export default Dashboard;