function HabitList({
  habits,
  deleteHabit,
  toggleHabit,
  setSelectedHistory,
}) {
  return (
    <div className="habit-card">
      <h2>Today's Habits</h2>

      {habits.map((habit, index) => (

  <div
    key={index}
    className={`habit-item ${
      habit.completed ? "completed" : ""
    }`}
  >

    <label>

      <input
        type="checkbox"
        checked={habit.completed}
        onChange={() => toggleHabit(index)}
      />

<span className="habit-text">

  {habit.category === "Health"
    ? "🏃"
    : habit.category === "Study"
    ? "📚"
    : habit.category === "Coding"
    ? "💻"
    : "🌱"}

  {" "}

  {habit.text}

<div className="habit-tags">

  <span
    className={`difficulty-badge ${
      habit.difficulty?.toLowerCase()
    }`}
  >
    {habit.difficulty === "Easy"
      ? "🟢 Easy"
      : habit.difficulty === "Medium"
      ? "🟡 Medium"
      : "🔴 Hard"}
  </span>

  <span className="frequency-badge">

    {habit.frequency === "Weekly"
      ? "🗓️ Weekly"
      : "📅 Daily"}

  </span>

</div>
</span>

    </label>

<button
  className="progress-btn"
  onClick={() =>
    setSelectedHistory(habit)
  }
>
  📈 View Progress
</button>

<button
  onClick={() => deleteHabit(index)}
>
  ❌
</button>

  </div>

))}
    </div>
  );
}

export default HabitList;