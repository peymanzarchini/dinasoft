import { createContext } from "react";

type NameContextType = {
  name: string;
  setName: (name: string) => void;
};

const NameContext = createContext<NameContextType | null>(null);

export default NameContext;
