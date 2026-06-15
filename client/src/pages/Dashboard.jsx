import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ProgressChart from "../components/ProgressChart";

import XPCard from "../components/XPCard";
import StreakCard from "../components/StreakCard";
import AchievementCard from "../components/AchievementCard";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import axios from "axios";
import AISuggestions from "../components/AISuggestions";
import Confetti from "react-confetti";

function Dashboard() {
  const navigate = useNavigate();
  
const [habits, setHabits] = useState([]);

const [xp, setXp] = useState(0);

const [streak, setStreak] = useState(0);

  const [achievements, setAchievements] = useState([]);

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [challengeCompleted,
  setChallengeCompleted] =
  useState(false);
  const [category, setCategory] =
  useState("Personal");

  const [newHabit, setNewHabit] = useState("");
  const [achievementPopup, setAchievementPopup] =
  useState("");
  const [showConfetti, setShowConfetti] =
  useState(false);

  const level = Math.floor(xp / 500) + 1;
  const badges = [];

if (xp >= 100)
  badges.push("🥉 Beginner");

if (xp >= 1000)
  badges.push("🥈 Consistent");

if (xp >= 3000)
  badges.push("🥇 Habit Master");

if (xp >= 5000)
  badges.push("💎 Legend");

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;
  const challengeTarget = 3;

const challengeProgress =
  Math.min(
    completedHabits,
    challengeTarget
  );
  const dailyGoal = habits.length;

const goalPercentage =
  Math.min(
    (completedHabits / dailyGoal) * 100,
    100
  );

const addHabit = async () => {

  if (newHabit.trim() === "") return;

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        "http://localhost:8000/api/habits",
        {
          text: newHabit,
          category: category,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setHabits([
      ...habits,
      response.data,
    ]);

    setNewHabit("");

  } catch (error) {

    console.log(error);

  }

};
const deleteHabit = async (indexToDelete) => {

  try {

    const token =
      localStorage.getItem("token");

    const habitToDelete =
      habits[indexToDelete];

    await axios.delete(
      `http://localhost:8000/api/habits/${habitToDelete._id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setHabits(
      habits.filter(
        (_, index) =>
          index !== indexToDelete
      )
    );

  } catch (error) {

    console.log(error);

  }

};
const toggleHabit = async (index) => {

  try {

    const token =
      localStorage.getItem("token");

    const habit =
      habits[index];

    const response =
      await axios.put(
        `http://localhost:8000/api/habits/${habit._id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const updatedHabits =
      [...habits];

    updatedHabits[index] =
      response.data;

let newXP;

if (response.data.completed) {
  newXP = xp + 10;
} else {
  newXP = xp - 10;
}

setXp(newXP);

await axios.put(
  "http://localhost:8000/api/auth/xp",
  {
    xp: newXP,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    setHabits(updatedHabits);

  } catch (error) {

    console.log(error);

  }

};



useEffect(() => {

  const unlocked = [];

  if (completedHabits >= 1) {
    unlocked.push("🏆 First Habit Completed");
  }

  if (completedHabits >= 10) {
    unlocked.push("🥉 Completed 10 Habits");
  }

  if (completedHabits >= 50) {
    unlocked.push("🥈 Completed 50 Habits");
  }

  if (completedHabits >= 100) {
    unlocked.push("🥇 Completed 100 Habits");
  }

  if (xp >= 1000) {
    unlocked.push("⭐ Earned 1000 XP");
  }

  if (xp >= 5000) {
    unlocked.push("🚀 Reached 5000 XP");
  }

  if (level >= 10) {
    unlocked.push("💎 Reached Level 10");
  }

  if (streak >= 7) {
    unlocked.push("🔥 7 Day Streak");
  }

  if (streak >= 30) {
    unlocked.push("🔥 30 Day Streak");
  }

  setAchievements(unlocked);
  if (
  unlocked.length >
  achievements.length
) {
  setAchievementPopup(
    unlocked[
      unlocked.length - 1
    ]
  );
  setShowConfetti(true);

setTimeout(() => {
  setShowConfetti(false);
}, 4000);

  setTimeout(() => {
    setAchievementPopup("");
  }, 3000);
}

}, [completedHabits, xp, streak, level]);

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
  useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

}, [navigate]);
useEffect(() => {

  const fetchHabits = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:8000/api/habits",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setHabits(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchHabits();

}, []);

  useEffect(() => {

  const fetchProfile = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setXp(response.data.xp);
      setStreak(response.data.streak);

    } catch (error) {

      console.log(error);

    }

  };

  fetchProfile();

}, []);
useEffect(() => {

  if (
    completedHabits >= 3 &&
    !challengeCompleted
  ) {

    setChallengeCompleted(true);

    const newXP = xp + 50;

    setXp(newXP);

    const token =
      localStorage.getItem("token");

    axios.put(
      "http://localhost:8000/api/auth/xp",
      {
        xp: newXP,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setAchievementPopup(
      "🎯 Daily Challenge Completed"
    );

    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

  }

}, [completedHabits]);


  return (
  
  <div className="dashboard-page">

    {achievementPopup && (
      <div className="achievement-popup">
        🎉 Achievement Unlocked!
        <br />
        {achievementPopup}
      </div>
    )}
    {showConfetti && (
  <Confetti
    recycle={false}
    numberOfPieces={250}
  />
)}

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
      <p className="dashboard-subtitle">
  Let's make habits dynamic today ✨
</p>
      

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
        <div className="stat-box">


  <h3>🎯 Daily Goal</h3>

  <p>
    {completedHabits}/{dailyGoal}
  </p>

</div>
<div className="goal-card">

  <h3>
    🎯 Daily Progress
  </h3>

  <div className="goal-progress">

    <div
      className="goal-fill"
      style={{
        width: `${goalPercentage}%`
      }}
    ></div>

  </div>

  <p>
    {completedHabits} of {dailyGoal}
    habits completed
  </p>

</div>

      </div>
      <div className="badges-card">

  <h3>🏅 Badges</h3>

  <div className="badges-list">

    {badges.map((badge, index) => (

      <span key={index}>
        {badge}
      </span>

    ))}

  </div>

</div>
<div className="challenge-card">

  <h3>
    🎯 Daily Challenge
  </h3>

  <p>
    Complete 3 habits today
  </p>

  <p>
    Progress:
    {challengeProgress}/3
  </p>

  <p>
    Reward: +50 XP
  </p>

</div>

<HabitForm
  newHabit={newHabit}
  setNewHabit={setNewHabit}
  addHabit={addHabit}
  category={category}
  setCategory={setCategory}
/>
      <AISuggestions />

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