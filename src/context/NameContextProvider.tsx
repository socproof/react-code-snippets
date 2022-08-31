import {createContext, ReactNode} from "react";

export const NameContext = createContext('');

export const NameContextProvider = ({initialName, children}: {initialName: string, children: ReactNode}) => (
  <NameContext.Provider value={initialName}>
    {children}
  </NameContext.Provider>
);
