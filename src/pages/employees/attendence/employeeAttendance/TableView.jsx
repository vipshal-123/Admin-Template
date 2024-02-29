import React from "react";
import { useState } from "react";
import UserListHead from "../../../../components/Employees/Attendence/UserListHead";
import UserListToolbar from "../../../../components/Employees/Attendence/UserListToolbar";
import { Link } from "react-router-dom";
import Page from "../../../../components/Page";
import Label from "../../../../components/Label";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

const TABLE_HEAD = [
  { id: "Date", label: "Date", alignRight: false },
  { id: "Checkin", label: "Check In", alignRight: false },
  { id: "Checkout", label: "Check Out", alignRight: false },
  { id: "Workinghours", label: "Working Hours", alignRight: false },
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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

const DailyView = (props) => {
  // const { attendenceData, setAttendenceData } =
  //   useContext(attendenceContext);

  // const { attendenceData } = props;

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("LastName");
  const [checked, setChecked] = useState(false);

  // const emptyRows =
  //   page > 0
  //     ? Math.max(0, (1 + page) * rowsPerPage - attendenceData.length)
  //     : 0;

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
            // const stabilizedThis = array.map((el, index) => [el, index]);
      
            // stabilizedThis.sort((a, b) => {
            //   const order = comparator(a[0], b[0]);
            //   if (order !== 0) return order;
            //   return a[1] - b[1];
            // });
      
            // return stabilizedThis.map((el) => el[0]);
          }
          // const stabilizedThis = array.map((el, index) => [el, index]);
          // stabilizedThis.sort((a, b) => {
          //   const order = comparator(a[0], b[0]);
          //   if (order !== 0) return order;
          //   return a[1] - b[1];
          // });
          // return stabilizedThis.map((el) => el[0]);
  }

  const filteredAttendence = applySortFilter(
    // attendenceData,
    getComparator(order, orderBy),
    filterName,
    checked
  );

  return (
    <Page title="HR Core - attendence">
      <Box>
        {/* <UserListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          setChecked={setChecked}
          checked={checked}
        /> */}
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              // rowCount={attendenceData.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
            {/* {filteredAttendence
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((filteredassociate) => {
                  const { _id, attendance } = filteredassociate; */}

                  {/* return ( */}
                    <TableRow
                      style={{ textDecoration: "none" }}
                      // key={_id}
                      hover
                      sx={{ underline: "false" }}
                      component={Link}
                    >
                      <TableCell align="left">
                        20/02/2024
                        {/* {filteredassociate?.date} */}
                      </TableCell>
                      <TableCell align="left">
                        9:30
                        {/* {filteredassociate?.punchin} */}
                      </TableCell>
                      <TableCell align="left">
                        18:30
                        {/* {filteredassociate?.punchout} */}
                      </TableCell>
                      <TableCell align="left">
                        9
                        {/* {filteredassociate?.hours} */}
                      </TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          // color={
                          //   (filteredassociate
                          //     ?.attendancetype === "Absent" &&
                          //     "error") ||
                          //   (filteredassociate
                          //     ?.attendancetype === "Compensation work" &&
                          //     "secondary") ||
                          //   (filteredassociate
                          //     ?.attendancetype === "Leave" &&
                          //     "info") ||
                          //   (filteredassociate
                          //     ?.attendancetype === "Present" &&
                          //     filteredassociate?.punchin >
                          //       "09:30" &&
                          //     "warning") ||
                          //   "success"
                          // }
                        >
                          {/* {filteredassociate?.attendancetype ===
                            "Present" &&
                            filteredassociate?.punchin > "09:30"
                            ? "Late"
                            : filteredassociate?.attendancetype} */}
                        </Label>
                      </TableCell>
                    </TableRow>
                  {/* ); */}
                {/* })} */}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }} key={Math.random}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}    */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          // count={filteredAttendence.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Page>
  );
};

export default DailyView;
