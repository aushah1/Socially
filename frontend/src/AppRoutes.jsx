import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/posts/pages/Feed";
import Users from "./features/users/pages/Users";
import Followers from "./features/users/pages/Followers";
import Following from "./features/users/pages/Following";
import Requests from "./features/users/pages/Requests";
import ProtectedRoute from "./features/shared/components/ProtectedRoute";
import Profile from "./features/users/pages/Profile";
import Saved from "./features/posts/pages/Saved";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {" "}
              <Feed />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              {" "}
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/followers"
          element={
            <ProtectedRoute>
              {" "}
              <Followers />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/following"
          element={
            <ProtectedRoute>
              {" "}
              <Following />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              {" "}
              <Requests />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
