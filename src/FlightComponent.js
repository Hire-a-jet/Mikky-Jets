import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Grid, Button, Typography, Box, Toolbar, AppBar, Card, CardContent, CardActions } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FaPlaneDeparture } from 'react-icons/fa';
import { HiOutlineTicket } from 'react-icons/hi';
import { CiLogout } from 'react-icons/ci';

function FlightComponent() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    async function getFlights() {
      try {
        const response = await axios.get("http://localhost:3005/flights/getFlights", {
          headers: {
            accesstoken: localStorage.getItem("token"),
          },
        });
        setFlights(response.data);  // Populate flights with data from the API
        setLoading(false);          // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching flights data:", error);
        setLoading(false);
      }
    }
    getFlights();

    // Retrieve customer data from local storage
    const storedCustomerData = localStorage.getItem('customerData');
    if (storedCustomerData) {
      setCustomerData(JSON.parse(storedCustomerData));
    }
  }, []);

  const ticketBooking = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3005/tickets/ticketBooking/${id}`, {
        flights: {
          Booking: true,  // Assuming you're sending this value
        },
      }, {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      });
      const updatedFlights = flights.map((flight) => 
        flight._id === id ? { ...flight, Booking: true } : flight
      );
      setFlights(updatedFlights);  // Update the flight's booking status
    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <Typography variant="h4">Loading Flights...</Typography>;
  }

  return (
    <>
      <Grid>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h2" component="div" sx={{ flexGrow: 3 }}>
                Happy Fly <FaPlaneDeparture size="5rem" /> <Button>Customer</Button>
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                <CiLogout color="red" size="3rem" /> Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        {customerData && (
          <Box sx={{ m: 2 }}>
            <Typography variant="h4">Customer Information</Typography>
            <Typography>Name: {customerData.name}</Typography>
            <Typography>Email: {customerData.email}</Typography>
            <Typography>Phone: {customerData.phone}</Typography>
            {/* Add more customer data fields as needed */}
          </Box>
        )}

        <Grid container spacing={6} style={{ padding: "50px" }}>
          {flights.length > 0 ? flights.map((row) => (
            <Grid item key={row._id}>
              <Card sx={{ minWidth: 400, minHeight: 200 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
                    {row.Airlines}
                  </Typography>
                  <Typography sx={{ mb: 1.0 }} color="text.secondary">
                    Depart: {row.depart}
                  </Typography>
                  <Typography sx={{ mb: 1.0 }} color="text.secondary">
                    Duration: {row.Duration}
                  </Typography>
                  <Typography sx={{ mb: 1.0 }} color="text.secondary">
                    Arrive: {row.Arrive}
                  </Typography>
                  <Typography sx={{ mb: 1.0 }} color="text.secondary">
                    Price: {row.Price}
                  </Typography>
                  <Typography sx={{ mb: 1.0 }} color="text.secondary">
                    From: {row.From} To: {row.To}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/tickets/${row._id}`}>
                    <Button variant="outlined" onClick={() => ticketBooking(row._id)}>
                      Book Now <HiOutlineTicket size="2rem" color="red" />
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          )) : (
            <Typography variant="h5" color="error">
           Ticket Booked Successfully

           check your email futher payment details
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default FlightComponent;
