import React, { useState } from 'react';
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';

const CompOffwork = () => {
  const [fromdate, setFromDate] = useState();
  const [todate, setToDate] = useState();
  const [reason, setReason] = useState('');
  const [days, setDays] = useState(0);
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
    }
  };

  const handleToDateChange = (newValue) => {
    setToDate(newValue);
    setErrors((prevErrors) => ({ ...prevErrors, todate: '' }));

    if (fromdate && newValue) {
      const dateRangeArray = getDatesInRange(fromdate, newValue);
      setDays(calculateDays(fromdate, newValue));
    }
  };

  const handleSubmit = async () => {
    // Validate if fromDate, toDate, and reason are not empty
    const newErrors = {};
    if (!fromdate) {
      newErrors.fromdate = 'Please select From Date.';
    }
    if (!todate) {
      newErrors.todate = 'Please select To Date.';
    }
    if (!reason) {
      newErrors.reason = 'Please provide a reason.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const AllData = {
        date: selectedDates,
        noOfDays: days,
        reason: reason,
      };

      const response = await axios.post(
        `https://hrm-backend-7n1d.onrender.com/api/v1/compoff/postcompoff/${7}`,
        AllData
      );

      setFromDate(null);
      setToDate(null);
      setSelectedDates([]);
      setReason('');
      setErrors({});
    
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card style={{ height: '500px', width: '500px', margin: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Apply
          </Typography>
          <Typography>Select a data range for compensation work</Typography>
        </div>
        <div>
          <Grid container columnSpacing={4} rowSpacing={4}>
            <Grid item xs={6}>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                From Date
              </Typography>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker format="DD/MM/YY" value={fromdate} onChange={handleFromDateChange} />
                </LocalizationProvider>
                {errors.fromdate && <Typography color="error">{errors.fromdate}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                To Date
              </Typography>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker format="DD/MM/YY" value={todate} onChange={handleToDateChange} />
                </LocalizationProvider>
                {errors.todate && <Typography color="error">{errors.todate}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
                Reason
              </Typography>
              <FormControl fullWidth>
                <TextField  value={reason} onChange={(e) => setReason(e.target.value)} />
                {!reason && <Typography color="error">{errors.reason}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </Card>
    </div>
  );
};

export default CompOffwork;