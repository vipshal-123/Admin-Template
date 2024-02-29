import React from "react";
import { useState, useEffect } from "react";
import Page from "../../../../components/Page";
import axios from "axios";
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import TableView from "./TableView";
import CalendarView from "./CalendarView";
import { MutatingDots } from "react-loader-spinner";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EmployeeAttendance = () => {
  const [value, setValue] = useState(0);
  const [attendenceData, setAttendenceData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const handleChangetoTab = (event, newValue) => {
    setValue(newValue);
  };

  // const getData = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://hrm-backend-7n1d.onrender.com/api/v1/attendance/getattendancebyid/1"
  //     );
  //     setAttendenceData(res.data.DataById.attendance);
  //     setLoader(false);
  //   } catch (error) {
  //     console.error("error", error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page title="HR Core - attendence">
      <Box>
        <Container sx={{ pb: 5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              Attendence
            </Typography>
          </Stack>
          <Grid item xs={12} md={6} lg={3}>
            <Box
              sx={{
                borderColor: "divider",
                pt: 1,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChangetoTab}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  disableRipple
                  label="Table View"
                  {...a11yProps(0)}
                  style={{ fontSize: 12 }}
                />
                <Tab
                  disableRipple
                  label="Calendar View"
                  {...a11yProps(1)}
                  style={{ fontSize: 12 }}
                />
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={9}>
            <Card style={{ borderRadius: "0px" }}>
              {/* {loader ? (
                <div
                  style={{
                    height: "78vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MutatingDots
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : ( */}
                <div>
                  <TabPanel value={value} index={0}>
                    <TableView attendenceData={attendenceData} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <CalendarView attendenceData={attendenceData} />
                  </TabPanel>
                </div>
              {/* )} */}
            </Card>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default EmployeeAttendance;
