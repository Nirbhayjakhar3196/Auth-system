import { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault(); 

   

    try {

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
      {
        email,
        password
      }
    )
      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successfully")
      navigate("/dashboard");

    } catch (error) {
        console.log(error.message)

        alert(
          error.response?.data?.message || "Something went wrong. Please try again later."
        )
    }
  }

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

      
        <button type="submit">Login</button>

      </form>

      <Link to="/register">
        Create a Account      
      </Link>
      <br />

      <Link to="/forgot">
        Forget Password?
      </Link>
    
    </div>
  );
}

export default Login;