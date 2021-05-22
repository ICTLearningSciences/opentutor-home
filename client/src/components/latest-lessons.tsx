/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React from "react";
import { useCookies } from "react-cookie";
import { List, Card, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchLessons, TUTOR_ENDPOINT } from "api";
import { Connection, Edge, Lesson } from "types";
import { isUint16Array } from "util/types";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    flexGrow: 2,
    padding: 25,
  },
  header: {
    textDecoration: "underline",
    textDecorationColor: "#ef3d56",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    overflow: "auto",
    whiteSpace: "nowrap",
    padding: 10,
  },
  card: {
    display: "flex",
    width: 300,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  text: {
    padding: 2,
    color: "white",
    textShadow: "2px 2px 3px #444",
    backgroundColor: "rgba(0, 0, 0, .2)",
    boxShadow: "0 0 5rem rgba(0, 0, 0, .5)",
  },
}));

export const LatestLessons = (): JSX.Element => {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [lessons, setLessons] = React.useState<Connection<Lesson>>();
  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    let mounted = true;
    fetchLessons(cookies.accessToken)
      .then((lessons) => {
        if (!mounted) {
          return;
        }
        if (lessons) {
          setLessons(lessons);
        }
      })
      .catch((err) => console.error(err));
    return () => {
      mounted = false;
    };
  }, []);

  function launchLesson(lessonId: string): void {
    const path = `${TUTOR_ENDPOINT}/?lesson=${lessonId}`;
    window.location.href = path;
  }
  const onMouseOver = (i: number): void => setHover(i);
  const onMouseOut = (i: number): void => setHover(-1);

  let list = undefined;
  if (lessons) {
    list = lessons.edges.map((edge: Edge<Lesson>, i: number) => {
      return (
        <ListItem
          id={`lesson-${i}`}
          key={i}
          onClick={() => {
            launchLesson(edge.node.lessonId);
          }}
        >
          <Card
            id={`image-${i}`}
            className={classes.card}
            style={{ backgroundImage: `url(${edge.node.image})` }}
            onMouseOver={() => onMouseOver(i)}
            onMouseOut={() => onMouseOut(i)}
            elevation={hover === i ? 10 : 1}
          >
            <h2 className={classes.text}>{edge.node.name}</h2>
          </Card>
        </ListItem>
      );
    });
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>Latest Lessons</h2>
      <List id="lessons" className={classes.list}>
        {list}
      </List>
    </div>
  );
};

export default LatestLessons;
