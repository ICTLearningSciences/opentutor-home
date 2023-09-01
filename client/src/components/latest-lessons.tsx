/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React from "react";
import { Card, ListItem, CircularProgress, Grid } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { TUTOR_ENDPOINT } from "api";
import { LoadStatus } from "types";
import { useAppSelector } from "store/hooks";
import { useWithLessons } from "store/slices/lessons/useWithLessons";
import defaultIcon from "static/ColoredLogo3.png";

export const LatestLessons = (): JSX.Element => {
  const { classes } = useStyles();
  const { loadStatus, lessons } = useWithLessons();
  const [hover, setHover] = React.useState(-1);
  const featured = useAppSelector(
    (state) => state.config.config?.featuredLessons || []
  );
  const logo = useAppSelector((state) => state.config.config?.logoLargeIcon);

  function launchLesson(lessonId: string): void {
    const path = `${TUTOR_ENDPOINT}/?lesson=${lessonId}`;
    window.location.href = path;
  }
  const onMouseOver = (i: number): void => setHover(i);
  const onMouseOut = (): void => setHover(-1);

  if (loadStatus === LoadStatus.IN_PROGRESS || loadStatus === LoadStatus.NONE) {
    return (
      <div className={classes.root}>
        <h2 className={classes.header}>Latest Lessons</h2>
        <CircularProgress />
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className={classes.root}>
        <h2 className={classes.header}>Latest Lessons</h2>
        <img style={{ height: 300 }} src={logo || defaultIcon} />
        <h4>Oops! There are no lessons.</h4>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>
        {featured.length > 0 ? "Featured Lessons" : "Latest Lessons"}
      </h2>
      <Grid data-cy="lessons" container className={classes.grid} spacing={3}>
        {lessons.map((lesson, i) => {
          return (
            <Grid item xs={12} md={6} lg={3} xl={2} key={i}>
              <ListItem
                data-cy={`lesson-${i}`}
                key={i}
                onClick={() => {
                  launchLesson(lesson.lessonId);
                }}
              >
                <Card
                  data-cy={`image-${i}`}
                  className={classes.card}
                  style={{ backgroundImage: `url(${lesson.image})` }}
                  onMouseOver={() => onMouseOver(i)}
                  onMouseOut={() => onMouseOut()}
                  elevation={hover === i ? 10 : 1}
                >
                  <h2 className={classes.text}>{lesson.name}</h2>
                </Card>
              </ListItem>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles({ name: { LatestLessons } })(() => ({
  root: {
    position: "relative",
    maxWidth: "95%",
    height: "100vh",
    paddingTop: 75,
    marginLeft: "auto",
    marginRight: "auto",
  },
  grid: {
    rowGap: 5,
    paddingBottom: 50,
    whiteSpace: "nowrap",
    padding: 10,
  },
  header: {
    textDecoration: "underline",
    textDecorationColor: "#ef3d56",
  },
  card: {
    display: "flex",
    width: "98%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    animation: "fadeInAnimation 0.3s",
    animationFillMode: "forwards",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  text: {
    padding: 2,
    width: "100%",
    textAlign: "center",
    color: "white",
    textShadow: "2px 2px 3px #444",
    backgroundColor: "rgba(0, 0, 0, .2)",
    boxShadow: "0 0 5rem rgba(0, 0, 0, .5)",
  },
}));

export default LatestLessons;
