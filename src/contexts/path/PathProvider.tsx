import { ReactNode, useState } from "react";
import { useLocation } from "react-router";

import PathContext from "./PathContext";
import { Path } from "../../types";

type PathProviderProps = {
  children: ReactNode;
};

export default function PathProvider({ children }: PathProviderProps) {
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState<Path>(
    location.pathname as Path
  );

  return (
    <PathContext.Provider value={{ selectedPath, setSelectedPath }}>
      {children}
    </PathContext.Provider>
  );
}
