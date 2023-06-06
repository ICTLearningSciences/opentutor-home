/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import React from "react";
import Slider from "react-slick";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ADMIN_ENDPOINT } from "api";
import chatImg from "static/chat.png";
import editImg from "static/edit.png";
import gradeImg from "static/grade.png";
import trainImg from "static/train.png";

const useStyles = makeStyles({ name: { Banner } })(() => ({
  root: {
    width: "100%",
    height: 300,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: 300,
    padding: 0,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  scrim: {
    width: "auto",
    minWidth: "min-content",
    maxWidth: "max-content",
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.99)",
    boxShadow: "0 0 1rem rgba(0, 0, 0, .5)",
  },
  subtitle: {
    fontSize: 20,
    color: "gray",
  },
  title: {
    fontSize: 30,
  },
  link: {
    margin: 5,
    background: "ef3d56",
  },
}));

const settings = {
  dots: true,
  speed: 500,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
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
              <CardContent
                className={classes.card}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div>
                  <div data-cy="banner-about" className={classes.scrim}>
                    <Typography className={classes.subtitle}>
                      {item.subtitle}
                    </Typography>
                    <Typography className={classes.title}>
                      {item.title}
                    </Typography>
                  </div>
                </div>
                <Button
                  className={classes.link}
                  color="secondary"
                  variant="contained"
                  disableElevation={true}
                  href={ADMIN_ENDPOINT}
                >
                  Go Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
}

export default Banner;
