import { useNavigate } from "react-router-dom";

function Upgrade() {

  const navigate = useNavigate();

  return (

    <div className="upgrade-page">

      <div className="upgrade-container">

        <h1>⭐ HabitForge Pro</h1>

        <p className="upgrade-subtitle">
          Unlock premium productivity features.
        </p>

        <div className="plans">

          <div className="plan free">

            <h2>Free</h2>

            <p>✔ Up to 10 Habits</p>

            <p>✔ AI Suggestions</p>

            <p>✔ Weekly Analytics</p>

            <p>✔ Heatmap</p>

            <p>✔ 5 Free CSV Exports</p>

          </div>

          <div className="plan premium">

            <h2>HabitForge Pro 🚀</h2>

            <p>✔ Unlimited Habits</p>

            <p>✔ Unlimited CSV Exports</p>

            <p>✔ Advanced Analytics</p>

            <p>✔ Priority AI Suggestions</p>

            <p>✔ Future Cloud Backup</p>

          </div>

        </div>

        <button
          className="premium-btn"
          onClick={() =>
            alert(
              "🚀 Demo Version\nPremium purchase coming soon!"
            )
          }
        >
          Upgrade Now
        </button>

        <button
          className="back-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>

  );

}

export default Upgrade;