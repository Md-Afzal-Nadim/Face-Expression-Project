import React from "react";
import { useAuth } from "../../auth/hooks/use.Auth";
import { useNavigate } from "react-router";
import "../style/navbar.scss";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Face Expression Music</h2>
        </div>

        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <span className="user-name">Hello, {user.username}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
