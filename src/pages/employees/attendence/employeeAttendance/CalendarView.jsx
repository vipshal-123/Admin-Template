import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import uniqid from "uniqid";
import { MutatingDots } from "react-loader-spinner";
import { useParams } from "react-router";

const CalendarView = () => {
  const {id} = useParams();
  const [holidays, setHolidays] = useState([]);
  const [punchIn, setPunchIn] = useState([]);
  const [punchOut, setPunchOut] = useState([]);
  const [attendancetype, setAttendancetype] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [loader, setLoader] = useState(true);

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

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `https://hrm-backend-7n1d.onrender.com/api/v1/attendance/getattendancebyid/1`
        );
        const employeedata = response.data.DataById;
        setEmployee(employeedata);

        const attendancePunchin = response.data.DataById.attendance
          .map((attendanceData) => {
            if (
              attendanceData.attendancetype !== "leave" &&
              attendanceData.punchin
            ) {
              const [day, month, year] = attendanceData.date.split("/");
              const formattedDate = `${year}-${month.padStart(
                2,
                "0"
              )}-${day.padStart(2, "0")}`;

              return {
                id: attendanceData._id,
                title: "Check In: " + attendanceData.punchin,
                allDay: true,
                start: formattedDate,
              };
            }
            return null;
          })
          .filter((event) => event !== null);

        const attendancePunchOut = response.data.DataById.attendance
          .map((attendanceData) => {
            if (
              attendanceData.attendancetype !== "leave" &&
              attendanceData.punchout
            ) {
              const [day, month, year] = attendanceData.date.split("/");
              const formattedDate = `${year}-${month.padStart(
                2,
                "0"
              )}-${day.padStart(2, "0")}`;

              return {
                id: uniqid(),
                title: "Check Out: " + attendanceData.punchout,
                allDay: true,
                start: formattedDate,
              };
            }
            return null;
          })
          .filter((event) => event !== null);

        const attendanceType = response.data.DataById.attendance
          .map((attendanceData) => {
            if (attendanceData.attendancetype !== "Present") {
              const [day, month, year] = attendanceData.date.split("/");
              const formattedDate = `${year}-${month.padStart(
                2,
                "0"
              )}-${day.padStart(2, "0")}`;

              return {
                id: uniqid(),
                title: attendanceData.attendancetype,
                allDay: true,
                start: formattedDate,
              };
            }
            return null;
          })
          .filter((event) => event !== null);

        setPunchIn(attendancePunchin);
        setPunchOut(attendancePunchOut);
        setAttendancetype(attendanceType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendance();
    fetchHolidays();
  }, []);

  const renderEventContent = (eventContent) => {
    const { event } = eventContent;
    const BackgroundColor =
      event.title === "Absent"
        ? "#FBDEDC"
        : event.title >= "Check In: 09:30" && event.title <= "Check Out: 18:30"
        ? "#dff4da"
        : "#C3E7FA";
    const TextColor =
      event.title >= "Check In: 09:30" && event.title <= "Check Out: 18:30"
        ? "#35a42a"
        : event.title === "Absent"
        ? "#d32f2f"
        : "#0288d1";
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
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends
          selectable
          selectMirror
          dayMaxEvents
          nextDayThreshold={"09:00:00"}
          events={[...holidays, ...punchIn, ...punchOut, ...attendancetype]}
          eventContent={renderEventContent}
        />
      )}
      ;
    </div>
  );
};

export default CalendarView;
