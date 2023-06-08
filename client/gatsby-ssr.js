import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "store/store";

import "css/style.css";
import "css/layout.css";

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
      <Provider store={store}>
        <CookiesProvider> {element} </CookiesProvider>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>
);
