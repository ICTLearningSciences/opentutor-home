/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React, { useEffect } from "react";
import { makeStyles } from "tss-react/mui";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Banner from "components/banner";
import LatestLessons from "components/latest-lessons";
import Header from "components/header";
import { useWithConfig } from "store/slices/config/useWithConfig";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles({ name: { IndexPage } })(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
}));

function IndexPage(): JSX.Element {
  const { classes } = useStyles();
  const { config, loadConfig } = useWithConfig();

  useEffect(() => {
    loadConfig();
  }, []);

  if (!config) {
    <div className={classes.root}>
      <CircularProgress />
    </div>;
  }

  return (
    <div className={classes.root}>
      <GoogleOAuthProvider clientId={config?.googleClientId || "test"}>
        <Header />
      </GoogleOAuthProvider>
      <Banner />
      <LatestLessons />
    </div>
  );
}

export default IndexPage;
