import { createContext, useState } from "react";

export const UserContext = createContext();

const AlertProvider = (props) => {
  const { children } = props;

  return (
    <UserContext.Provider
      value={{
        user: JSON.parse(localStorage.getItem("user")) || {},
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AlertProvider;
