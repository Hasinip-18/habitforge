import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/profile`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUser(response.data);
        console.log("Profile Data:", response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  const level =
    Math.floor(user.xp / 500) + 1;

  return (
  <div className="profile-page">

    <div className="profile-card">

      <div className="avatar-circle">
        {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
      </div>

      <h1>{user?.name}</h1>

      <p className="profile-email">
        📧 {user?.email}
      </p>

      <div className="profile-stats">

        <div className="profile-stat">
          <h3>⭐ XP</h3>
          <p>{user?.xp}</p>
        </div>

        <div className="profile-stat">
          <h3>🔥 Streak</h3>
          <p>{user?.streak}</p>
        </div>

        <div className="profile-stat">
          <h3>🏆 Level</h3>
          <p>{level}</p>
        </div>

      </div>

      <div className="level-section">

        <h3>Level Progress</h3>

        <div className="level-bar">

          <div
            className="level-fill"
            style={{
  width: `${((user?.xp || 0) % 500) / 5}%`,
}}
          ></div>

        </div>

        <p>
          {(user?.xp || 0) % 500}/500 XP
        </p>

      </div>

      <div className="badges-section">

        <h3>🏅 Badges</h3>

        <div className="badges-list">

          {user.xp >= 100 && (
            <span>🥉 Beginner</span>
          )}

          {user.xp >= 1000 && (
            <span>🥈 Consistent</span>
          )}

          {user.xp >= 3000 && (
            <span>🥇 Habit Master</span>
          )}

          {user.xp >= 5000 && (
            <span>💎 Legend</span>
          )}

        </div>

      </div>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </div>

  </div>
);
}

export default Profile;