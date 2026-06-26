function HabitForm({
  newHabit,
  setNewHabit,
  addHabit,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  frequency,
  setFrequency,
}) {
  return (

    <div className="habit-form-card">

      <div className="habit-icon">
        🌱
      </div>

      <div className="habit-form">

        <input
          type="text"
          placeholder="Enter a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Personal">🌱 Personal</option>
          <option value="Health">🏃 Health</option>
          <option value="Study">📚 Study</option>
          <option value="Coding">💻 Coding</option>
        </select>

        <button onClick={addHabit}>
          ➕ Add Habit
        </button>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">🟢 Easy</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Hard">🔴 Hard</option>
        </select>
        <select
value={frequency}
onChange={(e)=>
setFrequency(
e.target.value
)}
>

<option value="Daily">
📅 Daily
</option>

<option value="Weekly">
🗓 Weekly
</option>

</select>

      </div>

    </div>

  );
}

export default HabitForm;