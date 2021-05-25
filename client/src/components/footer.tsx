/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React from "react";
import { Link } from "gatsby";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ADMIN_ENDPOINT, TUTOR_ENDPOINT } from "api";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    alignItems: "center",
    flexGrow: 1,
  },
  link: {
    marginRight: 10,
    marginLeft: 10,
    color: "white",
    "&:hover": {
      color: "purple",
    },
  },
}));

function Footer(): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Link className={classes.link} to={ADMIN_ENDPOINT}>
          Admin
        </Link>
        <Link className={classes.link} to={TUTOR_ENDPOINT}>
          Tutor
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
