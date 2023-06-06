/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { makeStyles } from "tss-react/mui";
import { Link } from "gatsby";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import defaultIcon from "static/FavLogo3.png";

import { ADMIN_ENDPOINT, loginGoogle, login } from "api";
import { UserAccessToken } from "types";
import { useAppSelector } from "store/hooks";

const Header = (): JSX.Element => {
  const { classes } = useStyles();
  const logo = useAppSelector((state) => state.config.config?.logoIcon);
  const googleClientId = useAppSelector(
    (state) => state.config.config?.googleClientId
  );
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [username, setUsername] = React.useState<string>();

  useEffect(() => {
    let mounted = true;
    if (cookies.accessToken && !username) {
      login(cookies.accessToken).then((token: UserAccessToken) => {
        if (!mounted) {
          return;
        }
        if (!(token && token.user)) {
          console.error("token user is null");
          return;
        }
        setUsername(token.user.name);
        setCookie("accessToken", token.accessToken || "", { path: "/" });
      });
    }
    return () => {
      mounted = false;
    };
  }, [cookies]);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      onGoogleLoginSuccess(tokenResponse.access_token);
    },
    onError: (failRes) => {
      onGoogleLoginFailed(failRes);
    },
  });

  const onGoogleLoginSuccess = (accessToken: string): void => {
    loginGoogle(accessToken).then((token: UserAccessToken) => {
      setCookie("accessToken", token.accessToken, { path: "/" });
      window.location.href = ADMIN_ENDPOINT;
    });
  };

  const onGoogleLoginFailed = (
    res: Pick<TokenResponse, "error" | "error_description" | "error_uri">
  ): void => {
    console.error("login failed with error", JSON.stringify(res));
  };

  const onLogout = (): void => {
    removeCookie("accessToken", { path: "/" });
    setUsername("");
  };

  function LoginButton(): JSX.Element {
    if (!googleClientId) {
      return (
        <Button className={classes.link} data-cy="login" disabled={true}>
          Login
        </Button>
      );
    }

    return cookies.accessToken ? (
      <Button
        data-cy="logout"
        startIcon={
          <AccountCircle
            className={[classes.loginButton, classes.link].join(" ")}
          />
        }
        style={{ color: "white" }}
        onClick={onLogout}
      >
        {username}
      </Button>
    ) : (
      // Note: old login style had cookiePolicy={"single_host_origin"}, not sure if this is handled with new library
      <Button
        className={classes.link}
        onClick={() => googleLogin()}
        data-cy="login"
      >
        Login
      </Button>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          height: 70,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            src={logo || defaultIcon}
            style={{
              height: "auto",
              width: "auto",
              maxHeight: 70,
              marginTop: 10,
              marginBottom: 10,
              marginRight: 10,
              padding: 5,
            }}
          />
          <Typography variant="h5">OpenTutor</Typography>
        </div>
        <div>
          <Button className={classes.link} component={Link} to={ADMIN_ENDPOINT}>
            Admin
          </Button>
          {LoginButton()}
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles({ name: { Header } })(() => ({
  loginButton: {
    height: 40,
    width: 40,
  },
  link: {
    color: "white",
    "&:hover": {
      color: "purple",
    },
  },
}));

export default Header;
