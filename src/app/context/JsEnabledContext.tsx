"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const JsEnabledContext = createContext(false);

export const JsEnabledContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  return (
    <JsEnabledContext.Provider value={isJsEnabled}>
      {children}
    </JsEnabledContext.Provider>
  );
};

export const useIsJsEnabled = () => useContext(JsEnabledContext);
