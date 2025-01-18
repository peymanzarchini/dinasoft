import { useContext } from "react";

import PathContext from "./PathContext";

export default function usePath() {
  const pathContext = useContext(PathContext);

  if (!pathContext) {
    throw new Error("usePath has to be used within <PathContext.Provider>");
  }

  return pathContext;
}
