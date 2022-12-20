import React, { useEffect, useState,useNavigate } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Formik } from "formik";
import {HiOutlineTicket} from 'react-icons/hi'

function TicketComponent() {
  
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    from: "",
    to: "",
    depart: "",
    name : "",
    gender: "",
    economy: "",
    payment_type : "",
  });
  useEffect(() => {
    async function getData() {
      const response = await axios.get("https://63a12cb024d74f9fe849649e.mockapi.io/ticketBooking"
        
      );
      setUserData(response.data);
    }
    getData();
  }, []);
  const onPopulateData = (id) => {
    const selectedData = userData.filter((row) => row.id === id)[0];
    setFormData({ ...selectedData });
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://63a12cb024d74f9fe849649e.mockapi.io/ticketBooking/${id}`
    );
    const unDeletedData = userData.filter((row) => row.id !== id);
    setUserData(unDeletedData);
  };
  const validateForm = (formDataToValidate) => {
    var error = {};
    if (formDataToValidate.from === "") error.from = "From is Required";
    if (formDataToValidate.to === "") error.to = "To is Required";
    if (formDataToValidate.depart === "") error.depart = "Depart is Required";
    if (formDataToValidate.name === "") error.name = "Name is Required";
    if (formDataToValidate.gender === "") error.gender = "Gender is Required";
    if (formDataToValidate.economy === "")
      error.economy = "Economy is Required";
      if (formDataToValidate.payment_type === "") error.payment_type = "Payment_type is Required";
    return error;
  };
  const handleSubmit = async (formSubmittedData, { resetForm }) => {
    if (formData.id) {
      // Update
      const response = await axios.put(
        `https://63a12cb024d74f9fe849649e.mockapi.io/ticketBooing/${formData.id}`,
        { ...formSubmittedData }
      );
      let user = [...userData];
      let index = userData.findIndex((row) => row.id === formData.id);
      user[index] = response.data;
      setUserData(user);
      resetForm();
    } else {
      // Create
      const response = await axios.post(
        "https://63a12cb024d74f9fe849649e.mockapi.io/ticketBooing",
        { ...formSubmittedData }
      );
      setUserData([...userData, response.data]);
      resetForm();
      
    }
  };
  return (
    <div  style={{ padding: "10px"  }}>
      <h2 color="orange" >TICKET BOOKING<HiOutlineTicket size='3rem'color="red"/></h2>
      <Formik
        initialValues={formData}
        validate={validateForm}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          /* and other goodies */
        }) => (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              label="NAME"
              variant="outlined"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>
              {touched.name && errors.name}
            </span>
            <br />
              {/* Gender */}
              <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="gender"
                id="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <span style={{ color: "red" }}>
              {touched.gender && errors.gender}
            </span>
            <br />
            <TextField
              id="from"
              name="from"
              label="FROM"
              variant="outlined"
              value={values.from}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.from && errors.from}</span>
            <br />
            <TextField
              type="string"
              id="to"
              label="TO"
              variant="outlined"
              value={values.to}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.to && errors.to}</span>
            <br />
            <TextField
              id="depart"
              label="DEPART"
              variant="outlined"
              value={values.depart}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>
              {touched.depart && errors.depart}
            </span>
            <br />
            
          
            <FormControl fullWidth>
              <InputLabel id="label-courses">Economy</InputLabel>
              <Select
                labelId="label-economy"
                id="economy"
                name="economy"
                label="ECONOMY"
                value={values.economy}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Buissness Class"}>Buissness Class</MenuItem>
                <MenuItem value={"First Class"}>First Class</MenuItem>
                <MenuItem value={"Second Class"}>Second Class</MenuItem>
              </Select>
            </FormControl>
            <br />
            <span style={{ color: "red" }}>
              {touched.economy && errors.economy}
            </span>
            <br />
            <FormControl fullWidth>
              <InputLabel id="label-payment">Payment Type</InputLabel>
              <Select
                labelId="label-payment"
                id="payment_type"
                name="payment_type"
                label="Payment Type"
                value={values.payment_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Cash"}>CASH</MenuItem>
                <MenuItem value={"Upi"}>UPI</MenuItem>
                <MenuItem value={"Net Transfer"}>Net Transfer</MenuItem>
              </Select>
            </FormControl>
            <br />
            <span style={{ color: "red" }}>
              {touched.payment_type && errors.payment_type}
            </span>
            <br />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button variant="contained" onClick={resetForm}>
              Reset
            </Button>
          </Box>
        )}
      </Formik>

       <h3>Customer Data</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">From</TableCell>
              <TableCell align="right">To</TableCell>
              <TableCell align="right">Depart</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Economy</TableCell>
              <TableCell align="right">payment_type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.from}</TableCell>
                <TableCell align="right">{row.to}</TableCell>
                <TableCell align="right">{row.depart}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.economy}</TableCell>
                <TableCell align="right">{row.payment_type}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => onPopulateData(row.id)}>
                    Edit
                  </Button>
                  <Button variant="text" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
    </div>
  );
}


export default TicketComponent;