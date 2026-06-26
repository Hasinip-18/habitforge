function AchievementCard({
  achievements,
}) {
  const getAchievementIcon = (achievement) => {

  if (achievement.includes("First"))
    return "🌱";

  if (achievement.includes("10"))
    return "🥉";

  if (achievement.includes("50"))
    return "🥈";

  if (achievement.includes("100"))
    return "🥇";

  if (achievement.includes("1000"))
    return "⭐";

  if (achievement.includes("5000"))
    return "💎";

  if (achievement.includes("7 Day"))
    return "🔥";

  if (achievement.includes("30 Day"))
    return "🚀";

  return "🏆";

};

  return (

    <div className="achievement-card">

      <h2>
        🏅 Achievements
      </h2>

      <div className="achievement-grid">

        {achievements.length === 0 ? (

          <div className="achievement-empty">

            🔒

            <p>
              Complete habits to unlock achievements!
            </p>

          </div>

        ) : (

          achievements.map(
            (achievement, index) => (

              <div
                key={index}
                className="achievement-item"
              >

             <div className="achievement-icon">
  {getAchievementIcon(
    achievement
  )}
</div>

                <h4>
                  {achievement}
                </h4>

                <span>
                  Unlocked
                </span>

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}

export default AchievementCard;