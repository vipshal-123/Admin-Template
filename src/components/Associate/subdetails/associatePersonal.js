import {
  MenuItem,
  TextField,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputAdornment from "@mui/material/InputAdornment";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import EditIcon from "@mui/icons-material/Edit";
import Countries from "../../../utils/contries.json";
import LocalizationProvider from "@mui/lab/LocalizationProvider/";
import DatePicker from "@mui/lab/DatePicker";
import { useContext, useState } from "react";

const AssociateInfo = ({ updateFirebaseAndState }) => {
  const [openPersonal, setOpenPersonal] = useState(true);
  const [openPostal, setOpenPostal] = useState(false);
  const [personalDisabled, setPersonalDisabled] = useState(true);
  const [postalDisabled, setPostalDisabled] = useState(true);

  const CountriesArray = JSON.parse(JSON.stringify(Countries));

  const onUpdate = async (event) => {
    if (event.target.name === "Salary") {
     
    } else {
     
    }
  };
  const formatter = new Intl.NumberFormat(undefined, {
    maximumSignificantDigits: 3,
  });
  const onUpdateNested = (event) => {
 
  };

  const handleOpenPersonal = () => {
    setOpenPersonal((prev) => !prev);
  };

  const EditButtonStyles = {
    mt: 2,
    bgcolor: "grey.200",
    border: "2px solid",
    boxShadow: "none",
    // color: postalDisabled || personalDisabled ? "#abb2b9" : "black",
    color: "#abb2b9",
    "&:hover": {
      backgroundColor: "#e6ebf0",
      color: "#4782da",
    },
  };

  const DisabledTextBox = {
    "& .Mui-disabled": {
      opacity: 0.8,
      "-webkit-text-fill-color": "black",
    },
  };
  return (
    <Box sx={{ p: 0, pb: 1 }} dir="ltr">
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      ></Grid>
      <Grid container direction="rows" justifyContent="space-between">
        <Grid item>
          <Button
            sx={{ mt: 2 }}
            variant="standard"
            endIcon={
              openPersonal ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={handleOpenPersonal}
          >
            <Typography variant="overline">Personal</Typography>
          </Button>
        </Grid>
        <Grid item>
          {openPersonal && (
            <>
              <Button
                sx={EditButtonStyles}
                variant="contained"
                color="primary"
                endIcon={<EditIcon />}
                onClick={() => setPersonalDisabled((prev) => !prev)}
              >
                Edit
              </Button>
              {!personalDisabled && (
                <Button
                  sx={{ mt: 2, ml: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={() => updateFirebaseAndState()}
                >
                  Save
                </Button>
              )}
            </>
          )}
        </Grid>
      </Grid>

      {/* <Divider variant="middle" sx={{ pb: 2 }} /> */}
      <Collapse in={openPersonal} timeout="auto" unmountOnExit>
        {/* <FormControl> */}
        <Grid
          sx={{ p: 1, pb: 5, pt: 5 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={8} xl={4}>
            <TextField
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="FirstName"
              label="First Name"
              disabled={personalDisabled}
              sx={DisabledTextBox}
              defaultValue={"FirstName"}
              onChange={(e) => onUpdate(e)}
            />
          </Grid>
          <Grid item xs={8} xl={4}>
            <TextField
              disabled={personalDisabled}
              style={{ width: "100%" }}
              size="small"
              variant="standard"
              name="LastName"
              label="Last Name"
              defaultValue={"LastName"}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={personalDisabled}
              style={{ width: "100%" }}
              size="small"
              variant="standard"
              name="Title"
              label="Title"
              defaultValue={"Title"}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
            <Grid item sx={8} xm={4} xl={4}>
              <TextField
                select
                disabled={personalDisabled}
                style={{ width: "100%" }}
                name="Department"
                variant="standard"
                size="small"
                label="Department"
                defaultValue={"Department"}
                onChange={(e) => onUpdate(e)}
                sx={DisabledTextBox}
              >
                  <MenuItem key={1} value={`1`}>
                    department
                  </MenuItem>
              </TextField>
            </Grid>

          <Grid item xs={8} xl={4}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              disabled={personalDisabled}
              variant="standard"
              name="PhoneNumber"
              label="Phone Number"
              defaultValue={"PhoneNumber"}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={7} xl={4}>
            <TextField
              size="small"
              disabled={personalDisabled}
              variant="standard"
              style={{ width: "100%" }}
              defaultValue={"EmplStatus"}
              onChange={(e) => onUpdate(e)}
              select // tell TextField to render select
              name="EmplStatus"
              label="Employment Status"
              sx={DisabledTextBox}
            >
              <MenuItem key={"Employed"} value="Employed">
                Employed
              </MenuItem>
              <MenuItem key={"Terminated"} value="Terminated">
                Terminated
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={personalDisabled}
              variant="standard"
              style={{ width: "100%" }}
              size="small"
              name="WorkEmail"
              label="Work Email"
              defaultValue={"WorkEmail"}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={personalDisabled}
              variant="standard"
              style={{ width: "100%" }}
              size="small"
              name="PrivateEmail"
              label="Private Email"
              defaultValue={"PrivateEmail"}
              onChange={(e) => onUpdate(e)}
              sx={DisabledTextBox}
            />
          </Grid>
            <Grid item xs={5} xl={1}>
              <TextField
                disabled={personalDisabled}
                variant="standard"
                size="small"
                defaultValue={"Office"}
                onChange={(e) => onUpdate(e)}
                select // tell TextField to render select
                name="Office"
                label="Office"
                sx={DisabledTextBox}
              >
                  <MenuItem key={1} value={1}>
                    office
                  </MenuItem>
              </TextField>
            </Grid>
          <Grid item xs={5} xl={3}>
            <TextField
              disabled={personalDisabled}
              variant="standard"
              defaultValue={"Gender"}
              onChange={(e) => onUpdate(e)}
              select // tell TextField to render select
              name="Gender"
              label="Gender"
              size="small"
              sx={DisabledTextBox}
            >
              <MenuItem key={"Male"} value="Male">
                Male
              </MenuItem>
              <MenuItem key={"Female"} value="Female">
                Female
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item>
                <DatePicker
                  sx={DisabledTextBox}
                  disabled={personalDisabled}
                  variant="standard"
                  size="small"
                  label="Date of Birth"
                  name="DOB"
                  // value={moment(updatedAssociate.StartDate).toISOString()}
                  value={""}
                  inputFormat="dd-MM-yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={DisabledTextBox}
                    />
                  )}
                />
          </Grid>
          <Grid item>
                <DatePicker
                  sx={DisabledTextBox}
                  size="small"
                  disabled={personalDisabled}
                  label="Start Date"
                  name="StartDate"
                  // value={moment(updatedAssociate.StartDate).toISOString()}
                  value={""}
                  inputFormat="dd-MM-yyyy"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={DisabledTextBox}
                    />
                  )}
                />
          </Grid>

            <Grid item>
                <DatePicker
                  sx={DisabledTextBox}
                  // disabled={personalDisabled}
                  disabled={false}
                  label="Termination Date"
                  name="TerminationDate"
                  value={
                   ""
                  }
                  format="DD-MM-YYYY"
                  onChange={(e) => onUpdate(e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={DisabledTextBox}
                    />
                  )}
                />
            </Grid>

          <Grid item xs={8} xl={4}>
            <TextField
              sx={DisabledTextBox}
              disabled={personalDisabled}
              style={{ width: "100%" }}
              size="small"
              variant="standard"
              name="Salary"
              label="Salary"
              defaultValue={
                ""
              }
              onChange={(e) => onUpdate(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Collapse>
      <Divider variant="middle" />
      <Grid container direction="rows" justifyContent="space-between">
        <Grid item>
          <Button
            sx={{ pt: 2 }}
            variant="standard"
            endIcon={
              openPostal ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={() => {
              setOpenPostal((prev) => !prev);
            }}
          >
            <Typography variant="overline">Postal Address</Typography>
          </Button>
        </Grid>
        <Grid item>
          {openPostal && (
            <>
              <Button
                sx={EditButtonStyles}
                variant="contained"
                color="primary"
                endIcon={<EditIcon />}
                onClick={() => setPostalDisabled((prev) => !prev)}
              >
                Edit
              </Button>
              {!postalDisabled && (
                <Button
                  sx={{ mt: 2, ml: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={() => updateFirebaseAndState()}
                >
                  Save
                </Button>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <Collapse in={openPostal} timeout="auto" unmountOnExit>
        <Grid
          sx={{ p: 1, pt: 4, pb: 3 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} xl={6}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="FirstLine"
              label="First line of the address"
              defaultValue={"PostalAddress.FirstLine"}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                // "& .Mui-disabled": {
                //   color: "black",
                // },

                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} xl={6}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="SecondLine"
              label="Second line"
              defaultValue={"PostalAddress.SecondtLine"}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={7} xl={4}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="Postcode"
              label="Postcode"
              defaultValue={"PostalAddress.Postcode"}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={8} xl={4}>
            <TextField
              disabled={postalDisabled}
              style={{ width: "100%" }}
              variant="standard"
              size="small"
              name="City"
              label="City"
              defaultValue={"PostalAddress.City"}
              onChange={(e) => onUpdateNested(e)}
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <TextField
              disabled={postalDisabled}
              variant="standard"
              defaultValue={"PostalAddress.Country"}
              onChange={(e) => onUpdateNested(e)}
              select // tell TextField to render select
              size="small"
              name="Country"
              label="Country"
              sx={{
                "& .Mui-disabled": {
                  opacity: 0.8,
                  "-webkit-text-fill-color": "black",
                },
              }}
            >
              {CountriesArray.map((country, index) => (
                <MenuItem key={country.name} value={`${country.name}`}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Collapse>
      {/* </FormControl> */}
    </Box>
  );
};
export default AssociateInfo;
