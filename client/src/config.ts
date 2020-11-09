import axios from "axios";

const config = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
};

/*
This is a hacky place and means to get a server-configured
override of GOOGLE_CLIENT_ID.
It exists (at least for now), exclusively to enable
dev-local clients where opentutor lessons are being polished
to test serving those lessons
*/
if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
  // i.e. don't run at build time
  axios
    .get(`/config`)
    .then((result) => {
      if (typeof result.data["GOOGLE_CLIENT_ID"] === "string") {
        config.GOOGLE_CLIENT_ID = result.data["GOOGLE_CLIENT_ID"];
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export default config;
