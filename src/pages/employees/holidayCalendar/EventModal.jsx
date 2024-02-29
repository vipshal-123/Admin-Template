import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EventModal = (props) => {
  const {
    onClose,
    open,
    onAddEvent,
    selectedHolidayId,
    setSelectedDate,
    selectedDate,
    setSelectedHolidayId,
    setHolidays,
    holidays,
    ...rest
  } = props;

  const [selectedEvent, setSelectedEvent] = useState("Select Event");
  const [eventDescription, setEventDescription] = useState("");

  const resetState = () => {
    setSelectedEvent(null);
    setSelectedEvent("Select Event");
    setSelectedHolidayId(null);
    setSelectedDate(null);
    setEventDescription("");
  };

  const handleCancel = () => {
    onClose();
    resetState();
  };

  const handleSubmit = async (event) => {
    onAddEvent(event);
    if (selectedEvent === "Working Day" && selectedHolidayId) {
      const holidayId = selectedHolidayId;
      try {
        const response = await axios.delete(
          `https://hrm-backend-7n1d.onrender.com/api/v1/holiday/deleteholiday/${holidayId}`
        );
        if (response.data.message === "Event Deleted Sucessfully") {
          const updatedHolidays = holidays.filter(
            (holiday) => holiday.id !== holidayId
          );
          setHolidays(updatedHolidays);
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedEvent === "Holiday" && selectedDate) {
      try {
        const leaveType = eventDescription;
        const response = await axios.post(
          `https://hrm-backend-7n1d.onrender.com/api/v1/holiday/postnewholiday`,
          {
            date: selectedDate,
            leavetype: leaveType,
          }
        );
        if (response.data.message === "leaveType Updated Successfully") {
          const updatedHolidays = holidays.map((holiday) =>
            holiday.date === selectedDate
              ? { ...holiday, leavetype: leaveType }
              : holiday
          );
          setHolidays(updatedHolidays);
        }
      } catch (error) {
        console.error("error: ", error);
      }
    } else if (selectedEvent === "Holiday" && selectedHolidayId) {
      try {
        const leavetype = eventDescription;
        const response = await axios.put(
          `https://hrm-backend-7n1d.onrender.com/api/v1/holiday/updateholiday/${selectedHolidayId}`,
          {
            leavetype: leavetype,
          }
        );
        if (response.data.message === "leaveType Updated Successfully") {
          const updatedHolidays = holidays.map((holiday) =>
            holiday.date === selectedDate
              ? { ...holiday, leavetype: leavetype }
              : holiday
          );
          setHolidays(updatedHolidays);
        }
      } catch (error) {
        console.error(error);
      }
    }
    resetState();
  };
  return (
    <Dialog
      style={{ borderRadius: "0px" }}
      open={open}
      onClose={onClose}
      backdrop="static"
      {...rest}
    >
      <DialogTitle>Add a New Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormControl sx={{ minWidth: 320 }} size="small">
            <Select
              style={{ borderRadius: "0px" }}
              defaultValue={"Select Event"}
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="Select Event">
                <Typography>Select Event</Typography>
              </MenuItem>
              <MenuItem value={"Working Day"}>Working Day</MenuItem>
              <MenuItem value={"Holiday"}>Holiday</MenuItem>
            </Select>
          </FormControl>
        </DialogContentText>
        <TextField
          style={{ marginTop: "20px" }}
          autoFocus
          margin="dense"
          placeholder="Event Description"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          disabled={selectedEvent === "Working Day"}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
