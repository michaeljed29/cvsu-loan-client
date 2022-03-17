import { createContext, useState } from "react";

export const AlertContext = createContext();

const AlertProvider = (props) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const setAlert = (message, type) => {
    setMessage(message);
    setType(type);
    setIsOpen(true);
  };

  const closeAlert = () => setIsOpen(false);

  const { children } = props;

  return (
    <AlertContext.Provider
      value={{
        message,
        type,
        isOpen,
        setAlert,
        closeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
