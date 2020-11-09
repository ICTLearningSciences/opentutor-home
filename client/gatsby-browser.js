import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CookiesProvider } from "react-cookie";

import "css/style.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1b6a9c",
    },
  },
});

export const wrapRootElement = ({ element }) => (
  <MuiThemeProvider theme={theme}>
    <CookiesProvider>
      {element}
    </CookiesProvider>
  </MuiThemeProvider>
);
