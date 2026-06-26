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
import {
  calculateStreak,
  calculateBestStreak,
  calculateConsistency,
  generateHeatmap,
  getMostActiveDay,
} from "../utils/gamification";
import ExportCSV from "../components/ExportCSV";

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
  const [difficulty,
  setDifficulty] =
  useState("Easy");

  const [newHabit, setNewHabit] = useState("");
  const [achievementPopup, setAchievementPopup] =
  useState("");
  const [showConfetti, setShowConfetti] =
  useState(false);
  const [selectedHistory,
  setSelectedHistory] =
  useState(null);
  const [searchTerm, setSearchTerm] =
  useState("");

const [filterCategory,
  setFilterCategory] =
  useState("All");

const [filterDifficulty,
  setFilterDifficulty] =
  useState("All");
  const [xpAnimation,
setXpAnimation] =
useState(null);
const [loading, setLoading] =
  useState(true);
   const [frequency,
setFrequency] =
useState("Daily");
const [user, setUser] = useState(null);

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
  const filteredHabits =
  habits.filter((habit) => {

    const matchesSearch =
      habit.text
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesCategory =
      filterCategory === "All"
      || habit.category === filterCategory;

    const matchesDifficulty =
      filterDifficulty === "All"
      || habit.difficulty === filterDifficulty;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty
    );

  });
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
  if (
  !user?.isPremium &&
  habits.length >= 100
) {

  alert(
    "⭐ Free users can create up to 100 habits.\nUpgrade to HabitForge Pro for unlimited habits!"
  );

  return;

}

  try {

    const token =
      localStorage.getItem("token");

    const response =
await axios.post(
  "http://localhost:8000/api/habits",
  {
    text: newHabit,
    category: category,
    difficulty: difficulty,
    frequency: frequency,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
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
    {
      text: newHabit,
      category: category,
      difficulty: difficulty,
    },
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
const reward =
  habit.difficulty === "Hard"
    ? 30
    : habit.difficulty === "Medium"
    ? 20
    : 10;

newXP = xp + reward;
setXpAnimation(
`+${reward} XP`
);

setTimeout(() => {

setXpAnimation(null);

},2000);
} else {
const reward =
  habit.difficulty === "Hard"
    ? 30
    : habit.difficulty === "Medium"
    ? 20
    : 10;

newXP = xp - reward;
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
      setLoading(false);

    } catch (error) {

      console.log(error);
      setLoading(false);

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
      setUser(response.data);

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

const quotes = [
  "Small habits become big results.",
  "Discipline beats motivation.",
  "Success is the sum of small efforts.",
  "The future depends on what you do today.",
  "Stay consistent. Results will follow.",
  "Every expert was once a beginner.",
  "One step every day is enough.",
  "Tiny progress is still progress.",
];
const randomQuote =
  quotes[
    Math.floor(
      Math.random() *
      quotes.length
    )
  ];
  if (loading) {

  return (

    <div className="loading-screen">

      <div className="loading-logo">
        🌱
      </div>

      <h1>HabitForge</h1>

      <div className="spinner"></div>

      <p>
        Loading your journey...
      </p>

    </div>

  );

}

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
{xpAnimation && (

<div className="xp-popup">

✨ {xpAnimation}

</div>

)}

    {showLevelUp && (
      <div className="level-popup">
        🎉 LEVEL UP!
        <br />
        Level {level}
      </div>
    )}

<div className="profile-header">

<div className="avatar">

{user?.name
? user.name.charAt(0).toUpperCase()
: "?"}

</div>
<div>

<h1>
Welcome Back {user?.name} 👋
</h1>

  <p className="level-text">
    ⭐ Level {level}
  </p>

</div>

</div>
<div className="quote-card">

  <h3>
    ✨ Quote of the Day
  </h3>

  <p>
    "{randomQuote}"
  </p>

</div>
      

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
<ExportCSV
  habits={habits}
  user={user}
  setUser={setUser}
/>
<div className="upgrade-card">

  <div className="pro-badge">
    ⭐ HABITFORGE PRO
  </div>

  <h3>Unlock Premium Features</h3>

  <p>
    Take your productivity to the next level.
  </p>

  <div className="pro-features">

    <p>✨ Unlimited Habits</p>

    <p>📊 Advanced Analytics</p>

    <p>📄 CSV Export</p>

    <p>🤖 Priority AI Suggestions</p>

  </div>

  <button
    className="upgrade-btn"
    onClick={() => navigate("/upgrade")}
  >
    Upgrade Now 🚀
  </button>

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
  difficulty={difficulty}
  setDifficulty={setDifficulty}
  frequency={frequency}

setFrequency={setFrequency}
/>
      <AISuggestions />

      <div className="dashboard-grid">

        <XPCard xp={xp} />

        <StreakCard streak={streak} />

<div className="search-section">

  <h3>🔎 Find Your Habit</h3>

  <input
    type="text"
    placeholder="Search habits..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="search-box"
  />

  <div className="filter-row">

    <div className="filter-group">

      <label>Category</label>

      <select
        value={filterCategory}
        onChange={(e) =>
          setFilterCategory(e.target.value)
        }
      >
        <option>All</option>
        <option>Personal</option>
        <option>Health</option>
        <option>Study</option>
        <option>Coding</option>
      </select>

    </div>

    <div className="filter-group">

      <label>Difficulty</label>

      <select
        value={filterDifficulty}
        onChange={(e) =>
          setFilterDifficulty(e.target.value)
        }
      >
        <option>All</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

    </div>

  </div>

</div>
<HabitList
  habits={filteredHabits}
  deleteHabit={deleteHabit}
  toggleHabit={toggleHabit}
  setSelectedHistory={
    setSelectedHistory
  }
/>

        <AchievementCard
          achievements={achievements}
        />

      </div>
  {selectedHistory && (

  <div
    className="modal-overlay"
    onClick={() =>
      setSelectedHistory(null)
    }
  >

    <div
      className="modal-content"
      onClick={(e) =>
        e.stopPropagation()
      }
    >

      <button
        onClick={() =>
          setSelectedHistory(null)
        }
        className="close-btn"
      >
        ❌
      </button>

      <h2>
        🌟 Habit Journey
      </h2>

      <h3>
        {selectedHistory.text}
      </h3>
<div className="journey-stats">

  <div className="journey-stat">
    🔥 Current Streak:
    {" "}
    {calculateStreak(
      selectedHistory.completionDates
    )} Days
  </div>

  <div className="journey-stat">
    🏆 Best Streak:
    {" "}
    {calculateBestStreak(
      selectedHistory.completionDates
    )} Days
  </div>

  <div className="journey-stat">
    📊 Consistency:
    {" "}
    {calculateConsistency(
      selectedHistory.completionDates
    )}%
  </div>

  <div className="journey-stat">
    🏆 Most Active Day:
    {" "}
    {getMostActiveDay(
      selectedHistory.completionDates
    )}
  </div>

</div>

      <p>
        📅 Total Completions:
        {" "}
        {
          selectedHistory
            .completionDates
            ?.length || 0
        }
      </p>

<h4>Last 30 Days</h4>

<div className="heatmap">

  {generateHeatmap(
    selectedHistory.completionDates
  ).map((completed, index) => (

    <div
      key={index}
      className={
        completed
          ? "heatmap-cell active"
          : "heatmap-cell"
      }
    />

  ))}

</div>

    </div>

  </div>

)}

<ProgressChart
  habits={habits}
/>

</div>
);
}

export default Dashboard;