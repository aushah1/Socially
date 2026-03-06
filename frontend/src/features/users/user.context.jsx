import { useState, createContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(null);
  const [users, setUsers] = useState(null);

  return (
    <UserContext.Provider
      value={{ loading, setLoading, requests, setRequests, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}
