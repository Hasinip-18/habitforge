function HabitList({ habits, deleteHabit, toggleHabit }) {
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

      {habit.text}

    </label>

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