import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

// global theme adapter for UI theme
function themeAdapter(mode: any) {
  let theme = {
    styledComponentsTheme: {},
    materialTheme: createTheme({
      palette: {
        mode,
      },
    }),
  };
  switch (mode) {
    case "light":
      theme = {
        styledComponentsTheme: {
          backgroundColor: "#ffffff",
          color: "#000000",
        },
        materialTheme: createTheme({
          palette: {
            mode,
          },
        }),
      };
      return theme;
      break;
    case "dark":
      theme = {
        styledComponentsTheme: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        materialTheme: createTheme({
          palette: {
            mode,
          },
        }),
      };
      return theme;
      break;
    default:
      throw new Error("mode is error!");
  }
}

// step 1 ThemeContext
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ThemeContext = createContext({ toggleThemeMode: () => {} });

function ThemeModeProvider({ children }: any) {
  // step 2 mode state
  const [mode, setMode] = useState<PaletteMode>("light");

  // step 3 theme computed
  const theme = useMemo(() => themeAdapter(mode), [mode]);

  // step 4 mode compoted
  const themeMode = React.useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  // step 5 render
  return (
    <ThemeContext.Provider value={themeMode}>
      <StyledComponentsThemeProvider theme={theme.styledComponentsTheme}>
        <MaterialThemeProvider theme={theme.materialTheme}>
          {children}
        </MaterialThemeProvider>
      </StyledComponentsThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeModeProvider;
