import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpenIcon, UsersIcon, HomeIcon, SunIcon, MoonIcon } from "./UIHelpers";

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      {/* Brand logo & title */}
      <div className="nav-brand">
        <div className="nav-logo">🎓</div>
        <h2>Course Registry</h2>
      </div>

      {/* Navigation links & Theme toggle */}
      <div className="nav-right-group">
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            <HomeIcon size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => (isActive ? "active" : "")}>
            <BookOpenIcon size={18} />
            <span>Courses</span>
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => (isActive ? "active" : "")}>
            <UsersIcon size={18} />
            <span>Students</span>
          </NavLink>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn" 
          aria-label="Toggle theme mode"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
