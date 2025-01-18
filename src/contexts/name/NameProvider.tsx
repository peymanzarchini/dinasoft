import { ReactNode, useState } from "react";

import NameContext from "./NameContext";

type NameProviderProps = {
  children: ReactNode;
};

export default function NameProvider({ children }: NameProviderProps) {
  const [name, setName] = useState(localStorage.getItem("name") || "");

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}
