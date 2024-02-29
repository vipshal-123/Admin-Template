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
  Drawer,
} from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import LeaveTabel from "./LeaveTabel";
import LeaveForm from "../../requests/LeaveForm";

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

export const VidewDetails = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const LeaveList = () => {
  const [value, setValue] = useState(0);
  const handleChangetoTab = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 500 }} role="presentation" >
      <LeaveForm />
    </Box>
  );
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
              Leave
            </Typography>

            <Button variant="contained" onClick={toggleDrawer(true)}>Leave Request</Button>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
              {DrawerList}
            </Drawer>
          </Stack>

          <Grid item xs={12} md={6} lg={9}>
            <Card style={{ borderRadius: '0px' }}>
              <LeaveTabel />
            </Card>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default LeaveList;
