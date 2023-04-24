import React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CookiesProvider } from "react-cookie";

import "css/style.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b6a9c",
    },
  },
});

export const wrapRootElement = ({ element }) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CookiesProvider>{element}</CookiesProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);
