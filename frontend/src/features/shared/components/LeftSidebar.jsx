import React from "react";
import { NavLink } from "react-router";

const LeftSidebar = ({ user }) => {
  return (
    <>
      <aside className="left-sidebar">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h5>Socially</h5>
        </div>
        <div className="tabs">
          <nav>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              <i className="ri-home-5-fill"></i>
              <h5>Dashboard</h5>
            </NavLink>
            <NavLink
              to="/following"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              <i className="ri-team-line"></i>
              <h5>Following</h5>
            </NavLink>

            <NavLink
              to="/followers"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              {" "}
              <i className="ri-group-line"></i>
              <h5>Followers</h5>
            </NavLink>

            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              <i className="ri-notification-2-line"></i>
              <h5>Requests</h5>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              <i className="ri-profile-line"></i>
              <h5>Profile</h5>
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }>
              <i className="ri-user-line"></i>
              <h5>Users</h5>
            </NavLink>
          </nav>
          <div className="bottom">
            <img
              src={user?.profileImage || null}
              className="profile-image-bottom"
            />
            <div className="info">
              <h4>{user?.fullName || "Name"}</h4>
              <p>{user?.username || "username"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
