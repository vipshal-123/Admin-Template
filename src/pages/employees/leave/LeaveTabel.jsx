import React from "react";
import { useState, useEffect } from "react";
import UserListHead from "../../../components/Employees/Attendence/UserListHead";
import UserListToolbar from "../../../components/Employees/Attendence/UserListToolbar";
import Label from "../../../components/Label";
import { Link } from "react-router-dom";
import Scrollbar from "../../../components/Scrollbar";
import * as moment from "moment";
import Page from "../../../components/Page";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { CSVLink, CSVDownload } from "react-csv";
import { sentenceCase } from "change-case";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import { VidewDetails } from ".";
import infoOutline from "@iconify/icons-eva/info-outline";
import { Icon } from "@iconify/react";
import { MutatingDots } from "react-loader-spinner";

const TABLE_HEAD = [
  //   { id: "", label: "    ", alignRight: false },
  //   { id: "", label: "    ", alignRight: false },
  { id: "LeaveType", label: "Leave Type", alignRight: false },
  { id: "Dates", label: "Dates", alignLeft: false },
  { id: "No.of.Days", label: "No.of.Days", alignRight: false },
  { id: "ReportingTo", label: "Reporting To", alignRight: false },
  { id: "Status", label: "Status", alignRight: false },
];

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

const LeaveTabel = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("LastName");
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const [leaveData, setLeaveData] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleChangetoTab = (event, newValue) => {
    setValue(newValue);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * 5 - 10) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query, status) {
    if (status && query.length > 0) {
      const newArray = array.filter(
        (_user) =>
          _user.FirstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.LastName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      const stabilizedThis = newArray.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } else if (!status && query.length > 0) {
      const newArray = array.filter(
        (_user) =>
          (_user.FirstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
            _user.EmplStatus.indexOf("Employed") !== -1) ||
          (_user.LastName.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
            _user.EmplStatus.indexOf("Employed") !== -1)
      );
      const stabilizedThis = newArray.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } else if (status && query.length === 0) {
    } else if (!status && query.length === 0) {
      const newArray = array.filter(
        (_user) => _user.EmplStatus.indexOf("Employed") !== -1
      );
      const stabilizedThis = newArray.map((el, index) => [el, index]);

      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } else {
    }
  }
  const filteredattendence = applySortFilter(
    getComparator(order, orderBy),
    filterName,
    checked
  );


  const getData = async () => {
    try {
      const res = await axios.get(
        `https://hrm-backend-7n1d.onrender.com/api/v1/attendance/getleavebyid/1`
      );
      setLeaveData(res.data.leave);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="HR Core - attendence">
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
      <Box>
        <UserListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          setChecked={setChecked}
          checked={checked}
        />
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={10}
              onRequestSort={handleRequestSort}
            />
            {leaveData.map((data) => (
              <TableBody>
                <TableRow
                  key={data._id}
                  style={{ textDecoration: "none" }}
                  // key={1}
                  hover
                  sx={{ underline: "false" }}
                  // component={Link}
                  // to={`/dashboard/attendence/${1}`}
                >
                  <TableCell align="left">
                    <Grid container gap={1} alignItems={"center"}>
                      <Grid>{data.leavetype}</Grid>
                      <Grid>
                        <VidewDetails
                          title={
                            <React.Fragment>
                              <Typography color="inherit">
                                {data.reason}
                              </Typography>
                            </React.Fragment>
                          }
                        >
                          <Box
                            component={Icon}
                            icon={infoOutline}
                            sx={{verticalAlign:"middle", width: 16, height: 16 }}
                          />
                        </VidewDetails>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="left">
                    {data && data.date && data.date.length > 0 && data.date[0]}{" "}
                    -{" "}
                    {data &&
                      data.date &&
                      data.date.length > 0 &&
                      data.date[data.date.length - 1]}
                  </TableCell>
                  <TableCell align="left">{data.noofdays}</TableCell>
                  <TableCell align="left">Kishore</TableCell>
                  <TableCell align="left">
                    <Label
                      variant="ghost"
                      color={
                        (data.isapprove === "Rejected" && "error") ||
                        (data.isapprove === "Approved" && "success") ||
                        (data.isapprove === "Pending" && "warning")
                      }
                    >
                      {data.isapprove}
                    </Label>
                  </TableCell>
                  {/* <TableCell align="left">{data.reason}</TableCell> */}
                </TableRow>
                {emptyRows > 0 && (
                  <TableRow
                    style={{ height: 60 * emptyRows }}
                    key={Math.random}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={10}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
              )};
    </Page>
  );
};

export default LeaveTabel;
