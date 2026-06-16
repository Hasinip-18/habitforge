function HabitForm({
  newHabit,
  setNewHabit,
  addHabit,
  category,
  setCategory,
  difficulty,
  setDifficulty,
}){
  return (
    <div className="habit-form">

      <input
        type="text"
        placeholder="Enter a new habit..."
        value={newHabit}
        onChange={(e) =>
          setNewHabit(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="Personal">
          Personal
        </option>

        <option value="Health">
          Health
        </option>

        <option value="Study">
          Study
        </option>

        <option value="Coding">
          Coding
        </option>
      </select>


      <button onClick={addHabit}>
        Add Habit
      </button>
<select
  value={difficulty}
  onChange={(e) =>
    setDifficulty(e.target.value)
  }
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</select>

    </div>
  );
}

export default HabitForm;