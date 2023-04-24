/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ADMIN_ENDPOINT } from "api";
import chatImg from "images/banners/chat.png";
import editImg from "images/banners/edit.png";
import gradeImg from "images/banners/grade.png";
import trainImg from "images/banners/train.png";

const useStyles = makeStyles({ name: { Banner } })(() => ({
  root: {
    width: "100%",
    height: 300,
    flexGrow: 1,
  },
  card: {
    display: "flex",
    height: 300,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  scrim: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, .5)",
    boxShadow: "0 0 5rem rgba(0, 0, 0, .5)",
  },
  subtitle: {
    fontSize: 28,
    color: "white",
    textShadow: "2px 2px 3px #000",
  },
  title: {
    fontSize: 60,
    color: "white",
    textShadow: "6px 6px 7px #000",
  },
  link: {
    background: "ef3d56",
    marginTop: 25,
  },
}));

const settings = {
  dots: true,
  speed: 500,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface BannerData {
  image: string;
  title: string;
  subtitle: string;
}

const banners: BannerData[] = [
  {
    title: "Interactive tutoring lessons for students",
    subtitle: "What is OpenTutor?",
    image: chatImg,
  },
  {
    title: "Easy to author and edit lessons",
    subtitle: "Create Lessons",
    image: editImg,
  },
  {
    title: "View and grade student answers",
    subtitle: "Grade Answers",
    image: gradeImg,
  },
  {
    title: "Train and improve tutor accuracy",
    subtitle: "Improve Model",
    image: trainImg,
  },
];

export function Banner(): JSX.Element {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Slider {...settings}>
        {banners.map((item, i) => {
          return (
            <Card key={i} elevation={0}>
              <CardActionArea>
                <CardContent
                  className={classes.card}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className={classes.scrim}>
                    <Typography className={classes.subtitle}>
                      {item.subtitle}
                    </Typography>
                    <Typography className={classes.title}>
                      {item.title}
                    </Typography>
                    <Button
                      className={classes.link}
                      color="secondary"
                      variant="contained"
                      disableElevation={true}
                      href={ADMIN_ENDPOINT}
                    >
                      Go Now
                    </Button>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
}

export default Banner;
