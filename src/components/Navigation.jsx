import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const isLogged = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("token");
    isLogged.updateIsLogged();
    return navigate("/login");
  }

  return (
    <header>
      <Link to="/"><h1>Blog API</h1></Link>
      <nav>
        {isLogged.isLogged === true && 
          <NavLink
            to="/newpost"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            New post
          </NavLink>
        }

        <div className="sign-links">
          {/* isLogged is an object */}
          {isLogged.isLogged === true ? 
            <NavLink
              onClick={handleLogout}
              to="#"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Logout
            </NavLink>
            :
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Sign-in
            </NavLink>
          }
        </div>
      </nav>
    </header>
  )
}

export default Navigation