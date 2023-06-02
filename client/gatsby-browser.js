import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { TssCacheProvider } from "tss-react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import createCache from "@emotion/cache";
import { store } from "store/store";

import "css/style.css";

const cache = createCache({
  key: "tss",
});

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
      <TssCacheProvider value={cache}>
        <Provider store={store}>
          <CookiesProvider> {element} </CookiesProvider>{" "}
        </Provider>{" "}
      </TssCacheProvider>{" "}
    </ThemeProvider>{" "}
  </StyledEngineProvider>
);
