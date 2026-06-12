function HabitList({ habits, deleteHabit }) {
  return (
    <div className="habit-card">

      <h2>Today's Habits</h2>

      {habits.map((habit, index) => (
        <div
          key={index}
          className="habit-item"
        >
          <span>{habit}</span>

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