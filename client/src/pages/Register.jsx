import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const registerUser = async () => {

  try {

    await axios.post(
      "http://localhost:8000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    alert("Registration Successful!");
navigate("/login");

  } catch (error) {

    alert(
  error.response?.data?.message ||
  "Registration failed"
);

  }

};
  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>
<input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

   <button
  onClick={registerUser}
>
  Get Started
</button>


      </div>

    </div>
  );
}

export default Register;