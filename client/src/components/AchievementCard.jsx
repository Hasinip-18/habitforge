function AchievementCard({ achievements }) {

  return (
    <div className="achievement-card">

      <h2>Achievements</h2>

      {achievements.length === 0 ? (
        <p>No achievements yet</p>
      ) : (
        achievements.map(
          (achievement, index) => (
            <p key={index}>
              {achievement}
            </p>
          )
        )
      )}

    </div>
  );
}

export default AchievementCard;