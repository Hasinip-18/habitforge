import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  const isLoggedIn =
    localStorage.getItem("token");

  return (
    <nav className="navbar">

      <h2 className="logo">
        🏆 HabitForge
      </h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {!isLoggedIn && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/profile">
  Profile
</Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;