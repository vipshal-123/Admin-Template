import React from "react";
import { useState, useEffect } from "react";
import UserListHead from "../../../components/Employees/Attendence/UserListHead";
import UserListToolbar from "../../../components/Employees/Attendence/UserListToolbar";
import Label from "../../../components/Label";
import { Link } from "react-router-dom";
import Scrollbar from "../../../components/Scrollbar";
import * as moment from "moment";
import Page from "../../../components/Page";
// import { CSVLink, CSVDownload } from "react-csv";
import { sentenceCase } from "change-case";
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
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import { boolean } from "yup";
import { MutatingDots } from "react-loader-spinner";

const TABLE_HEAD = [
  { id: "EmployeeName", label: "Employee Name", alignRight: false },
  { id: "Dates", label: "Dates", alignLeft: false },
  { id: "No.of.Days", label: "No.of.Days", alignRight: false },
  { id: "Leave Type", label: "Leave Type", alignRight: false },
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

const Leave = (props) => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("LastName");
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const [leaveData, setLeaveData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [empId, setEmpId] = useState();
  const [leaveId, setLeaveId] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loader, setLoader] = useState(true);

  const handleRequest = async (value) => {
    console.log(value);
    try {
      const res = await axios.put(
        `https://hrm-backend-7n1d.onrender.com/api/v1/attendance/leaveapproval/${empId}/${leaveId}`,
        {
          isapprove: value,
        }
      );
      await getData();
      console.log(res, "new");
    } catch (error) {
      console.log(error);
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveData.length) : 0;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
    handleCloseAction();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
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

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px 3px, ",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  function applySortFilter(array, comparator, query, status) {
    // const stabilizedThis = array.map((el, index) => [el, index]);

    if (status && query.length > 0) {
      const newArray = array.filter(
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
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
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      const stabilizedThis = newArray.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } else if (status && query.length === 0) {
      const stabilizedThis = array.map((el, index) => [el, index]);

      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } else if (!status && query.length === 0) {
      // return filter(
      //   array,
      //   (_user) => _user.EmplStatus.indexOf("Employed") !== -1
      // );
      // const newArray = array.filter(
      //   (_user) => _user.EmplStatus.indexOf("Employed") !== -1
      // );
      const stabilizedThis = array.map((el, index) => [el, index]);

      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    } else {
      const stabilizedThis = array.map((el, index) => [el, index]);

      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });

      return stabilizedThis.map((el) => el[0]);
    }
    // const stabilizedThis = array.map((el, index) => [el, index]);
    // stabilizedThis.sort((a, b) => {
    //   const order = comparator(a[0], b[0]);
    //   if (order !== 0) return order;
    //   return a[1] - b[1];
    // });
    // return stabilizedThis.map((el) => el[0]);
  }
  const filteredLeave = applySortFilter(
    leaveData,
    getComparator(order, orderBy),
    filterName,
    checked
  );

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://hrm-backend-7n1d.onrender.com/api/v1/attendance/getleave`
      );
      setLeaveData(res.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
  };

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
        <Box sx={{ padding: "15px" }}>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            setChecked={setChecked}
            checked={checked}
          />
          {/* <Scrollbar> */}
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={10}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredLeave
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) =>
                    data.leave.length > 0
                      ? data.leave.map((leave) => (
                          <TableRow
                            key={leave._id} // Use leave._id as the key for TableRow
                            style={{ textDecoration: "none" }}
                            hover
                            sx={{ underline: "false" }}
                            component={Link}
                          >
                            <TableCell align="left">{data.name}</TableCell>
                            <TableCell align="left">
                              {leave &&
                                leave.date &&
                                leave.date.length > 0 &&
                                leave.date[0]}
                              -{" "}
                              {leave &&
                                leave.date &&
                                leave.date.length > 0 &&
                                leave.date[leave.date.length - 1]}
                            </TableCell>
                            <TableCell align="left">{leave.noofdays}</TableCell>
                            <TableCell align="left">
                              {leave.leavetype}
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                disableRipple
                                variant="contained"
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(event) => {
                                  handleClickAction(event);
                                  setEmpId(data.empid);
                                  setLeaveId(leave._id);
                                }}
                                endIcon={<KeyboardArrowDownIcon />}
                                style={{
                                  backgroundColor:
                                    leave.isapprove === "Pending"
                                      ? "white"
                                      : leave.isapprove === "Approved"
                                      ? "green"
                                      : "red",
                                  color:
                                    leave.isapprove === "Pending"
                                      ? "black"
                                      : "white",
                                }}
                              >
                                {leave.isapprove === "Pending"
                                  ? "Action"
                                  : leave.isapprove === "Approved"
                                  ? "Approved"
                                  : "Rejected"}
                              </Button>
                              <StyledMenu
                                id="demo-customized-menu"
                                MenuListProps={{
                                  "aria-labelledby": "demo-customized-button",
                                }}
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseAction}
                              >
                                <MenuItem
                                  onClick={() => {
                                    handleCloseAction();
                                    handleRequest("Approved");
                                  }}
                                  disableRipple
                                >
                                  {" "}
                                  {/* Pass empid and leave id to handleApprove */}
                                  Approve
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleClickOpen();
                                    handleRequest("Rejected");
                                  }}
                                  disableRipple
                                >
                                  {" "}
                                  {/* Pass empid and leave id to handleReject */}
                                  Reject
                                </MenuItem>
                              </StyledMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      : null
                  )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{ height: 50 * emptyRows }}
                    key={Math.random}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Scrollbar> */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={leaveData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
      ;
    </Page>
  );
};

export default Leave;
