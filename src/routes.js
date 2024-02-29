import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Associates from "./pages/Associates";
import AssociateDetails from "./pages/AssociateDetails";
import AttendenceList from "./pages/employees/attendence";
import LeaveList from "./pages/employees/leave";
import LeaveApproval from "./pages/approval/leave";
import CompWork from "./pages/approval/compwork";
import HolidayCalendar from "./pages/employees/holidayCalendar/HolidayCalender";
import AttendanceCalendar from "./pages/employees/attendence/attendanceCalendar/AttendanceCalendar";
import LeaveForm from "./pages/requests/LeaveForm";
import CompOffwork from "./pages/requests/CompOffwork";
import EmployeeAttendance from "./pages/employees/attendence/employeeAttendance/EmployeeeAttendance";


// ----------------------------------------------------------------------

export default function Router() {
  // console.log("location", location);
  return useRoutes([
    {
      path: "/dashboard",
      element:  <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "associates",
          element: <Associates />,
        },
      //   {
      //     path: "employees/employeesattendence",
      //     element: <AttendenceList />,
      //   },
        {
          path: "employees/attendence",
          element: <EmployeeAttendance />,
        },
      //   {
      //     path: "employees/leave",
      //     element: <LeaveList />,
      //   },
      //   {
      //     path: "approval/leave",
      //     element: <LeaveApproval />,
      //   },
      //   {
      //     path: "approval/compwork",
      //     element: <CompWork />,
      //   },
      //   {
      //     path: "holidaycalendar",
      //     element: <HolidayCalendar />,
      //   },
        {
          path: "employees/newemployees",
          element: <LeaveForm />,
        },
      //   {
      //     path: "requests/compwork",
      //     element: <CompOffwork />,
      //   },
        { path: "associates/:id", element: <AssociateDetails /> },
        { path: "/dashboard/*", element: <Page404 /> },
      ],
    },
    {
      path: "/",
      element: (
        <LogoOnlyLayout />
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "/error", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Navigate to="/error" replace /> },
  ]);
}
