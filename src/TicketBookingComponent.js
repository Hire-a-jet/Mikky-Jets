import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {Link} from 'react-router-dom';


// ===================================================================================================================

function Users() {
  let formValues = {
    id: "",
    name: "",
    gender: "",
    from: "",
    to: "",
    depart: "",
    economy : "",
    payment_type : "",
    error: {
        name: "",
        gender: "",
        from: "",
        to: "",
        depart: "",
        economy : "",
        payment_type : "",
    },
  };
  const [formData, setFormData] = useState(formValues);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "http://localhost:3005/ticket/ticketBooingDetails"
      );
      setUserData(response.data);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    let error = { ...formData.error };
    if (e.target.value === "") {
      error[e.target.name] = `${e.target.name} is Required`;
    } else {
      error[e.target.name] = "";
    }
    setFormData({ ...formData, [e.target.name]: e.target.value, error });
  };

  const onPopulateData = (_id) => {
    const selectedData = userData.filter((row) => row._id === _id)[0];
    setFormData({
      ...formData,
      ...selectedData,
    });
  };
  const handleDelete = async (_id) => {
    const response = await axios.delete(
      `http://localhost:3005/ticket/delete/:id${_id}`
    );
    console.log(response);
    const user = userData.filter((row) => row._id !== response.data._id);
    setUserData(user);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Delete
    const errKeys = Object.keys(formData).filter((key) => {
      if (formData[key] === "" && key !== "error" && key !== "_id") {
        return key;
      }
    });
    if (errKeys.length >= 1) {
      alert("Please fill all values");
    } else {
      if (formData._id) {
        // Update
        const response = await axios.put(
          `http://localhost:3005/ticket/ticketBookingWithReturn/${formData.id}`,
          {
            name: formData.name,
            gender: formData.gender,
            from: formData.from,
            to: formData.to,
            depart: formData.depart,
            economy : formData.economy,
            payment_type : formData.payment_type,
          }
        );
        let users = [...userData];
        let index = users.findIndex((row) => row._id === response.data._id);
        users[index] = response.data;
        setUserData(users);
      } else {
        // Create
        const response = await axios.post(
          "http://localhost:3005/ticket/ticketBooking",
          {
            name: formData.name,
            gender: formData.gender,
            from: formData.from,
            to: formData.to,
            depart: formData.depart,
            economy : formData.economy,
            payment_type : formData.payment_type,
          }
        );
        setUserData([...userData, response.data]);
      }
      setFormData(formValues);
    }
  };
  // ==============================================================================================================
  return (
    <div style={{ padding: "20px" }}>
      
      <Link to="/flights"><Button variant="outlined">flights</Button>&nbsp;</Link>
      
      
      <h3> Customers Ticket Details </h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "30ch" },
        }}
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={formData.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.name}</span>
        <br />
       
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="gender"
          value={formData.gender}
          onChange={(e) => handleChange(e)}
        >
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
        <br />
        <span style={{ color: "red" }}>{formData.error.gender}</span>
        
        <TextField
          id="from"
          type="from"
          label="From"
          variant="standard"
          name="from"
          value={formData.from}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.from}</span>
        <br />
        
        <TextField
          id="to"
          type="to"
          label="To"
          variant="standard"
          name="to"
          value={formData.to}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.to}</span>
        <br />
        
        <TextField
          id="depart"
          type="depart"
          label="Depart"
          variant="standard"
          name="depart"
          value={formData.depart}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <span style={{ color: "red" }}>{formData.error.depart}</span>
        <br />
        <FormControl fullWidth>
          <InputLabel id="Courses">Economy</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Economy"
            name="economy"
            value={formData.economy}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="React">Buissness Class</MenuItem>
            <MenuItem value="Node">First Class</MenuItem>
            <MenuItem value="Javascript">Second Class</MenuItem>
          </Select>
        </FormControl>
        <br />
        <span style={{ color: "red" }}>{formData.error.economy}</span>
        <br /> <br />
        <FormControl fullWidth>
          <InputLabel id="Courses">Payment_type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Payment_type"
            name="payment_type"
            value={formData.payment_type}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value="React">Card</MenuItem>
            <MenuItem value="Node">Cash</MenuItem>
            <MenuItem value="Javascript">UPI</MenuItem>
          </Select>
        </FormControl>
        <br />
        <span style={{ color: "red" }}>{formData.error.payment_type}</span>
        <br /> <br />
   
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      {/* ========================================================================================================== */}
      <h3> Customer Data </h3>
      <TableContainer component={Paper}>
        <Table sx={{ width: 1300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">from</TableCell>
              <TableCell align="right">To</TableCell>
              <TableCell align="right">Depart</TableCell>
              <TableCell align="right">Economy</TableCell>
              <TableCell align="right">Payment_type</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.from}</TableCell>
                <TableCell align="right">{row.to}</TableCell>
                <TableCell align="right">{row.depart}</TableCell>
                <TableCell align="right">{row.economy}</TableCell>
                <TableCell align="right">{row.payment_type}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => onPopulateData(row._id)}>
                    Edit
                  </Button>&nbsp;
                  
                  <Button variant="contained" onClick={() => handleDelete(row._id)}>
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

export default Users;
