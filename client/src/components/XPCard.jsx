function XPCard({ xp }) {

  const level = Math.floor(xp / 500) + 1;

  const progress = ((xp % 500) / 500) * 100;

  return (
    <div className="xp-card">

      <h2>
        Level {level} Habit Warrior 🏆
      </h2>

      <p>
        {xp} XP
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`
          }}
        ></div>
      </div>

    </div>
  );
}

export default XPCard;