import { createContext } from "react";

import { Path } from "../../types";

type PathContextType = {
  selectedPath: Path;
  setSelectedPath: (path: Path) => void;
};

const PathContext = createContext<PathContextType | null>(null);

export default PathContext;
