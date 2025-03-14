import { createContext, useState } from "react";

// Create context
export const CounterContext = createContext(null);

// Create provider component
export const CounterProvider = ({ children }) => {
  const [userdata, setuserdata] = useState(null); // Global state

  return (
    <CounterContext.Provider value={{ userdata, setuserdata }}>
      {children}
    </CounterContext.Provider>
  );
};
