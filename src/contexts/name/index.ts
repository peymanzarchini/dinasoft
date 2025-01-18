import { useContext } from "react";

import NameContext from "./NameContext";

export default function useName() {
  const nameContext = useContext(NameContext);

  if (!nameContext) {
    throw new Error("useName has to be used within <NameContext.Provider>");
  }

  return nameContext;
}
