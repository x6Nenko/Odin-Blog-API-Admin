import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const isLogged = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const responseData = await response.json(); // Extract JSON from the response
        localStorage.setItem("token", responseData.token);
        isLogged.updateIsLogged();
        return navigate("/");
      } else {
        const responseData = await response.json(); // Extract JSON from the response
        console.error('Something went wrong:', responseData);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      // Handle other error cases
    }
  };

  return (
    <main>
      {isLogged.isLogged ? 
        <div>
          <p>You&apos;re already logged in.</p>
        </div>
      :
        <div className="form-container">
          <form onSubmit={handleSubmit} className="sign-form">
            <div className="input-holder">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required></input>
            </div>

            <div className="input-holder">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required></input>
            </div>

            <button type="submit">Sign in</button>
          </form>
        </div>
      }
    </main>
  )
}

export default Login