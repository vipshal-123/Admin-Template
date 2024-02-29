import React, { useState } from 'react';
import { Button, Card, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import styled from '@emotion/styled';
const Datepick=styled(DatePicker)`
  .css-byy1as-MuiInputBase-root-MuiOutlinedInput-root {
    height: 40px;
  }
`
const TextArea=styled(TextField)`
  .css-1dbfjdh-MuiInputBase-root-MuiOutlinedInput-root {
    height: 40px;
  }
`

const LeaveForm = () => {
  const [type, setType] = useState('');
  const [fromdate, setFromDate] = useState();
  const [todate, setToDate] = useState();
  const [days, setDays] = useState(0);
  const [report, setReport] = useState('');
  const [reason, setReason] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [errors, setErrors] = useState({});

  const formatDate = (date) => (date ? dayjs(date).format('DD/MM/YY') : null);

  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(formatDate(currentDate));
      currentDate = dayjs(currentDate).add(1, 'day').toDate();
    }

    setSelectedDates(dates);
  };

  const calculateDays = (startDate, endDate) => {
    const start = dayjs(startDate, 'DD/MM/YY');
    const end = dayjs(endDate, 'DD/MM/YY');
    const diffInDays = end.diff(start, 'day') + 1; // Adding 1 to include both start and end dates
    return diffInDays;
  };

  const handleFromDateChange = (newValue) => {
    setFromDate(newValue);
    setErrors((prevErrors) => ({ ...prevErrors, fromdate: '' }));

    if (newValue && todate) {
      const dateRangeArray = getDatesInRange(newValue, todate);
      setDays(calculateDays(newValue, todate));
      console.log(dateRangeArray);
    }
  };

  const handleToDateChange = (newValue) => {
    setToDate(newValue);
    setErrors((prevErrors) => ({ ...prevErrors, todate: '' }));

    if (fromdate && newValue) {
      const dateRangeArray = getDatesInRange(fromdate, newValue);
      setDays(calculateDays(fromdate, newValue));
      console.log(dateRangeArray);
    }
  };

  const handleSubmit = async () => {
    // Validate if fromDate, toDate, and reason are not empty
    const newErrors = {};
    if (!type) {
        newErrors.type = 'Please select Leave type.';
      }
    if (!fromdate) {
      newErrors.fromdate = 'Please select From Date.';
    }
    if (!todate) {
      newErrors.todate = 'Please select To Date.';
    }
    if (type !== 'CompOff Leave' && !report) {
      newErrors.report = 'Please provide Reporting To.';
    }
    if (type !== 'CompOff Leave' && !reason) {
      newErrors.reason = 'Please provide a Reason.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const AllData = {
        date: selectedDates,
        noofdays: days,
        reason: reason,
        leavetype: type,
      };
      console.log(AllData, 'da');

      const response = await axios.post(
        `https://hrm-backend-7n1d.onrender.com/api/v1/attendance/leaverequest/${7}`,
        AllData
      );
      console.log(response);
      setType('');
      setFromDate(null);
      setToDate(null);
      setSelectedDates([]);
      setDays(0);
      setReport('');
      setReason('');
      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  const compOffSubmit = async () => {
    try {
      const AllData = {
        dates: selectedDates,
      };
      console.log(AllData, 'da');

      const response = await axios.post(
        `https://hrm-backend-7n1d.onrender.com/api/v1/compoff/usingcompoff/${7}`,
        AllData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ marginLeft: '20px'}}>
        Leave Form
      </Typography>
      {/* <Card style={{ width: '100%', height: '500px' }}> */}
        <Grid container columnSpacing={4} rowSpacing={3} style={{ padding: '20px' }}>
          <Grid item xs={12}>
            <FormControl fullWidth size='small'>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                Leave Type
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Full Day">Full Day</MenuItem>
                <MenuItem value="Half Day">Half Day</MenuItem>
                <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                <MenuItem value="CompOff Leave">CompOff Leave</MenuItem>
                <MenuItem value="Others">Others </MenuItem>
              </Select>
            </FormControl>
            {!type && <Typography color="error">{errors.type}</Typography>}
          </Grid>

          <Grid item xs={6}>
            <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              From Date
            </Typography>
            <FormControl fullWidth size='small'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Datepick value={fromdate} onChange={handleFromDateChange} format="DD/MM/YY"  />
              </LocalizationProvider>
              {errors.fromdate && <Typography color="error">{errors.fromdate}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
              To Date
            </Typography>
            <FormControl fullWidth size='small'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Datepick value={todate} onChange={handleToDateChange} format="DD/MM/YY" />
              </LocalizationProvider>
              {errors.todate && <Typography color="error">{errors.todate}</Typography>}
            </FormControl>
          </Grid>
          {type === 'CompOff Leave' ? (
            ''
          ) : (
            <Grid item xs={12}>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                Reporting To
              </Typography>
              <FormControl fullWidth size='small'>
                <TextArea value={report} onChange={(e) => setReport(e.target.value)} sx={{height:"40px"}} />
                {!report && <Typography color="error">{errors.report}</Typography>}
              </FormControl>
            </Grid>
          )}
          {type === 'CompOff Leave' ? (
            ''
          ) : (
            <Grid item xs={12}>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                Reason
              </Typography>
              <FormControl fullWidth size='small'>
                <TextArea value={reason} onChange={(e) => setReason(e.target.value)} />
                {!reason && <Typography color="error">{errors.reason}</Typography>}
              </FormControl>
            </Grid>
          )}
          <Grid item xs={4}>
            <FormControl fullWidth size='small'>
              <Button variant="contained" onClick={type === 'CompOff Leave' ? compOffSubmit : handleSubmit} style={{ marginTop: '10px' }}>
                Submit
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      {/* </Card> */}
    </div>
  );
};

export default LeaveForm;
