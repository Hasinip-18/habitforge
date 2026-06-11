function Register() {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Register;