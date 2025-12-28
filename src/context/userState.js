import { useState } from "react";
import UserContext from "./userContext";

const UserState = ({ children }) => {
  // Legacy placeholder: this context is not used anymore.
  // Kept without any hardcoded tokens or network calls to avoid security leaks.
  const [users] = useState([]);

  const signup = async () => {
    console.warn("UserState.signup is deprecated and not in use.");
  };

  const login = async () => {
    console.warn("UserState.login is deprecated and not in use.");
  };

  return (
    <UserContext.Provider value={{ users, login, signup }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
