function HabitCard() {
  return (
    <div className="habit-card">

      <h2>Today's Habits</h2>

      <label>
        <input type="checkbox" />
        Drink 3L Water
      </label>

      <label>
        <input type="checkbox" />
        Read 20 Pages
      </label>

      <label>
        <input type="checkbox" />
        Workout 30 Minutes
      </label>

    </div>
  );
}

export default HabitCard;