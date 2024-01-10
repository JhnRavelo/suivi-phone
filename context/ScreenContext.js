import { createContext, useState } from "react";

const ScreenContext = createContext();

const ScreenProvider = ({ children }) => {
  const [screen, setScreen] = useState();
  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenProvider };

export default ScreenContext;
