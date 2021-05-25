/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "gatsby";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { ADMIN_ENDPOINT, TUTOR_ENDPOINT, loginGoogle, login } from "api";
import { getClientID } from "config";
import { UserAccessToken } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
  },
  logoButton: {
    marginRight: theme.spacing(2),
    width: 200,
    height: 50,
  },
  loginButton: {
    height: 40,
    width: 40,
  },
  links: {
    position: "absolute",
    right: theme.spacing(1),
  },
  link: {
    color: "white",
    "&:hover": {
      color: "purple",
    },
  },
}));

const Header = (): JSX.Element => {
  const classes = useStyles();
  const [googleClientId, setClientId] = React.useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [username, setUsername] = React.useState<string>();

  React.useEffect(() => {
    let mounted = true;
    getClientID()
      .then((id: string) => {
        if (!mounted) {
          return;
        }
        setClientId(id);
      })
      .catch((err) => console.error(err));
    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
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

  const onLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    if ((response as GoogleLoginResponseOffline).code !== undefined) {
      return;
    }
    const loginResponse = response as GoogleLoginResponse;
    loginGoogle(loginResponse.accessToken).then((token: UserAccessToken) => {
      setCookie("accessToken", token.accessToken, { path: "/" });
      window.location.href = ADMIN_ENDPOINT;
    });
  };

  const onLoginFailed = (response: {
    error: string;
    details: string;
  }): void => {
    console.error(
      `login failed with error ${response.error}: ${response.details}`
    );
  };

  const onLogout = (): void => {
    removeCookie("accessToken", { path: "/" });
    setUsername("");
  };

  function LoginButton(): JSX.Element {
    if (!googleClientId) {
      return (
        <Button data-cy="login" style={{ color: "white" }} disabled={true}>
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
      <GoogleLogin
        clientId={googleClientId}
        isSignedIn={cookies.accessToken}
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailed}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <Button
            data-cy="login"
            style={{ color: "white" }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Login
          </Button>
        )}
      />
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">OpenTutor</Typography>
          <div className={classes.links}>
            <Button
              className={classes.link}
              component={Link}
              to={ADMIN_ENDPOINT}
            >
              Admin
            </Button>
            <Button
              className={classes.link}
              component={Link}
              to={TUTOR_ENDPOINT}
            >
              Tutor
            </Button>
            {LoginButton()}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
