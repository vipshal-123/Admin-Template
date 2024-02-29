import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../../components/Page";
import PropTypes from "prop-types";
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import CompWork from "./CompWork";

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

 const LeaveList = () => {
  const [value, setValue] = useState(0);
  const handleChangetoTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="HR Core - Leave">
      <Box>
        <Container maxWidth="xl" sx={{ pb: 5 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography variant="h4" gutterBottom>
              Compensation Work
            </Typography>

            <Button variant="contained" component={Link} to={"newassociate"}>
                Leave Request
            </Button>
          </Stack>
          
        <Grid item xs={12} md={6} lg={9}>
          <Card style={{ borderRadius: '0px' }}>
          <CompWork />
          </Card>
        </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default LeaveList;
