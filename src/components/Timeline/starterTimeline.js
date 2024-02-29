import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Card, CardHeader, Avatar, Typography, Grid } from "@mui/material";
import moment from "moment";

export default function StarterTimeline() {
  const today = new Date();
  today.setDate(today.getDate() - 30);
  // const today = "20201-11-15T12:30:00";
  // const today = "20201-11-15T12:30:00";

  const GetInitial = (name) => {
    return name.slice(0, 1) + ".";
  };

  return (
    <Card>
      <CardHeader title="Starters in last 30 days" />
        <Timeline position="left" sx={{ p: 3, pt: 4 }}>
          <TimelineSeparator />
                <TimelineItem>
                  <TimelineOppositeContent
                    color="text.secondary"
                    sx={{ m: "auto 0" }}
                  >
                    {/* {StartDate && moment(StartDate.toDate()).format("MMMM Do")} */}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="primary" variant="filled">
                      {/* <CheckCircleOutlineIcon fontSize="small" /> */}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>

                  <TimelineContent sx={{ m: "auto 0" }}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Grid>
                        <Avatar
                          src={""}
                          alt="Profile Pic"
                          sx={{ width: 30, height: 30 }}
                        />
                      </Grid>
                      <Grid sx={{ pl: 1 }}>
                        <Typography>
                          {/* {FirstName} {GetInitial(FirstName)} */}
                          Bala {GetInitial("Bala")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
        </Timeline>
    </Card>
  );
}
