import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import CakeIcon from "@mui/icons-material/Cake";
import { Card, Avatar, Typography, Grid } from "@mui/material";
import moment from "moment";

export default function BirthdayTimeline() {
  const todayDate = new Date();
  const now = moment(todayDate);

  const GetInitial = (name) => {
    return name.slice(0, 1) + ".";
  };
  const BirthdayFunc = (arrayofAssocaites) => {
    const haveBirthdaySoon = [];
    arrayofAssocaites.forEach((associate) => {
      const birthDay = moment(associate.DOB.toDate()).year(now.year());
      const birthDayNextYear = moment(associate.DOB.toDate()).year(
        now.year() + 1
      );

      const daysRemaining = Math.min(
        birthDay.diff(now, "days"),
        birthDayNextYear.diff(now, "days")
      );

      if (daysRemaining >= 0 && daysRemaining <= 32) {
        haveBirthdaySoon.push({
          ...associate,
          daysRemaining: daysRemaining,
        });
      }
    });
    return haveBirthdaySoon.sort(function (a, b) {
      return a.daysRemaining - b.daysRemaining;
    });
  };

  return (
    <Card>
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item pt={3} pl={2}>
              <Typography variant="h6">Upcoming Birthdays</Typography>
              {/* <CardHeader title="Upcoming Birthdays" />
      <CardMedia>
        <CakeIcon color="primary" />
      </CardMedia> */}
            </Grid>
            <Grid item pt={2} pr={2}>
              <CakeIcon color="primary" fontSize="large" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
            <Timeline position="left" sx={{ p: 3, pt: 4 }}>
              <TimelineSeparator />
                    <TimelineItem>
                      <TimelineOppositeContent
                        color="text.secondary"
                        sx={{ m: "auto 0" }}
                      >
                        {/* {DOB && moment(DOB.toDate()).format("MMMM Do")} */}
                        DOB
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
                          <Grid sx={{ pl: 2 }}>
                            <Typography>
                              {/* {FirstName} {GetInitial(FirstName)} */}
                              {/* {GetInitial(FirstName)} */}
                              Bala {GetInitial("FirstName")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TimelineContent>
                    </TimelineItem>
            </Timeline>
        </Grid>
      </Grid>
    </Card>
  );
}
