function StreakCard({ streak }) {
  return (
    <div className="streak-card">

      <h2>🔥 Current Streak</h2>

      <h1>{streak} Days</h1>

    </div>
  );
}

export default StreakCard;