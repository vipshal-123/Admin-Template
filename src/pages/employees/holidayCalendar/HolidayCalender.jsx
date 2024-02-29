import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import EventModal from "./EventModal";
import { MutatingDots } from "react-loader-spinner";

const HolidayCalendar = () => {
  const [editable, setEditable] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [selectedHolidayId, setSelectedHolidayId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchHolidays();
  }, [selectedHolidayId, selectedDate, holidays]);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(
        "https://hrm-backend-7n1d.onrender.com/api/v1/holiday/allholidays"
      );
      const holidaysData = response.data.AllData.map((holiday) => ({
        id: holiday._id,
        title:
          holiday.leavetype === "Sunday"
            ? "Week Off"
            : holiday.leavetype === "Saturday"
            ? "Week Off"
            : holiday.leavetype,
        allDay: true,
        start: holiday.date,
      }));
      setHolidays(holidaysData);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateSelect = (selectInfo) => {
    setEditable(true);
    const selectedDate = selectInfo.startStr;
    const selectedHoliday = holidays.find(
      (holiday) => holiday.start === selectedDate
    );
    if (selectedHoliday) {
      setSelectedHolidayId(selectedHoliday.id);
    } else {
      setSelectedDate(selectedDate);
      setSelectedHolidayId(null);
    }
  };

  const handleEventClick = (clickInfo) => {
    setEditable(true);
    setSelectedHolidayId(clickInfo.event.id);
  };

  const renderEventContent = (eventContent) => {
    const { event } = eventContent;
    const BackgroundColor = event.title === "" ? "#dff4da" : "#C3E7FA";
    const TextColor = event.title === "" ? "#dff4da" : "#0288d1";
    return (
      <>
        <div
          className="fc-event-main"
          style={{ backgroundColor: BackgroundColor, borderRadius: "3px" }}
        >
          <div
            className="fc-event-title"
            style={{ color: TextColor, marginLeft: "5px", fontWeight: 600 }}
          >
            {event.title}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="calendar-app">
      {loader ? (
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
      ) : (
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends
            // editable
            selectable
            selectMirror
            dayMaxEvents
            nextDayThreshold={"09:00:00"}
            events={holidays}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
          />
          <EventModal
            open={editable}
            onClose={() => setEditable(false)}
            onAddEvent={() => {
              setEditable(false);
              setSelectedHolidayId(null);
            }}
            selectedHolidayId={selectedHolidayId}
            setSelectedHolidayId={setSelectedHolidayId}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setHolidays={setHolidays}
            holidays={holidays}
          />
        </div>
      )};
    </div>
  );
};

export default HolidayCalendar;
