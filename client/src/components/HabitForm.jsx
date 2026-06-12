function HabitForm({ newHabit, setNewHabit, addHabit }) {
  return (
    <div className="habit-form">

      <input
        type="text"
        placeholder="Enter a new habit..."
        value={newHabit}
        onChange={(e) => setNewHabit(e.target.value)}
      />

      <button onClick={addHabit}>
        Add Habit
      </button>

    </div>
  );
}

export default HabitForm;