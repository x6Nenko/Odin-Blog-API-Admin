import { Outlet, useLocation } from "react-router-dom";
import Home from "./Home";
import Navigation from "../components/Navigation";
import { AuthProvider } from "../contexts/AuthContext";

const Root = () => {
  let location = useLocation();

  return (
    <AuthProvider>
      <div className="main-wrapper">
        <Navigation />
        {location.pathname === "/" && <Home />}
        <Outlet />
      </div>
    </AuthProvider>
  )
}

export default Root