import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router";

import NameProvider from "../contexts/name/NameProvider";
import PathProvider from "../contexts/path/PathProvider";
import theme from "../theme";

import "../index.css";

type AppProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PathProvider>
          <NameProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </NameProvider>
        </PathProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
