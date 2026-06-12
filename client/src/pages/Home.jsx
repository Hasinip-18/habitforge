import { Link } from "react-router-dom";
import { FaBullseye } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

function Home() {
  return (
    <div className="home">

      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>

      <div className="hero-content">

        <h1>HabitForge</h1>

        <h2>Build Better Habits</h2>

        <p className="tagline">
          Track habits, earn XP, maintain streaks and
          <span className="level-up"> Level Up Your Life</span>
        </p>

        <Link to="/register">
          <button className="hero-btn">
            Start Your Journey
          </button>
        </Link>

        {/* FEATURES */}

        <div className="features">

          <div className="feature-card">
           <h3>
  <FaBullseye /> Smart Tracking
</h3>
            <p>
              Track habits effortlessly every day.
            </p>
          </div>

          <div className="feature-card">
            <h3><FaFire /> Streak System</h3>
            <p>
              Build consistency through streaks.
            </p>
          </div>

          <div className="feature-card">
            <h3><FaStar /> XP Rewards</h3>
            <p>
              Earn XP whenever you complete habits.
            </p>
          </div>

          <div className="feature-card">
            <h3><FaTrophy /> Achievements</h3>
            <p>
              Unlock badges and milestones.
            </p>
          </div>

        </div>
        <div className="stats">

  <div className="stat-box">
    <h2>10K+</h2>
    <p>Habits Completed</p>
  </div>

  <div className="stat-box">
    <h2>2K+</h2>
    <p>Active Users</p>
  </div>

  <div className="stat-box">
    <h2>50K+</h2>
    <p>XP Earned</p>
  </div>

  <div className="stat-box">
    <h2>99%</h2>
    <p>Consistency Growth</p>
  </div>

</div>

      </div>

    </div>
  );
}

export default Home;