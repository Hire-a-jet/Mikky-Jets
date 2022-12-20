import React ,{useEffect, useState}from "react";
// import jwt from "jsonwebtoken";
import axios from "axios";
 import { Navigate, useNavigate,Link } from "react-router-dom";
import {Grid , Button, Typography,Box, Toolbar, AppBar,Card,CardContent,CardActions} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {FaPlaneDeparture} from 'react-icons/fa';
import {HiOutlineTicket} from 'react-icons/hi';
import {CiLogout} from 'react-icons/ci';



function FlightComponent() {
  const navigate = useNavigate();

  const[flights , setFlights] = useState([]);
  useEffect(() => {
      async function getFlights(){

          // const decodedToken = jwt.decode(localStorage.getItem("token"));
          // if(decodedToken.exp *1000 < DataTransfer.now()){
          //     navigate("/");
          // }
         const response = await axios.get("http://localhost:3005/flights/getFlights",{
          headers:{
              accesstoken:localStorage.getItem("token"),
          }
         });
      
         setFlights(response.data);
      }
      getFlights();

  },[]);

  const ticketBooking = async (id,value) => {
   const response = await axios.post(`http://localhost:3005/tickets/ticketBooing/${id}`,
   {
    flights : {
      Booking : value,
    }
  },{
      headers : {
        accesstoken : localStorage.getItem("token")
      }
    }
   );
   
   let flightCopy = [...flights];
   const index = flights.findIndex((row) => row._id === id);
   flights[index].Booking = response.data.value.Booking;
   setFlights(flightCopy);

  }
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
    
  return(
    <>
    <Grid>
    <Box sx={{ flexGrow: 1 }} >
   <AppBar position="static" >
     <Toolbar>
       <IconButton
         size="large"
         edge="start"
         color="black"
         aria-label="menu"
         sx={{ mr: 2 }}
         
       >
         <MenuIcon />
       </IconButton>
       <Typography variant="h2" component="div"  sx={{ flexGrow: 3 }} >
         Happy Fly<FaPlaneDeparture size='5rem'/> <Button>Customer</Button>
       </Typography>
       
       
       <Button color="inherit"
       onClick={()=>handleLogout()} size="3rem" 
       ><CiLogout color="red" size="3rem"/>Logout </Button>
     </Toolbar>
   </AppBar>
 </Box>
 <Grid container spacing={6} style={{padding : "50px"}}>
   {flights.map(row =>(
     <Grid item key={row._id}>
        <Card sx={{ minWidth: 400 , minHeight : 200 }}>
   <CardContent>
     <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
      {row.Airlines}
     </Typography>
     <Typography variant="h5" component="div">
     </Typography>
     <Typography sx={{ mb: 1.0 }} color="text.secondary">
       Depart :  {row.depart}
     </Typography>
     <Typography sx={{ mb: 1.0 }} color="text.secondary">
       Duration :  {row.Duration}
     </Typography>
     <Typography sx={{ mb: 1.0 }} color="text.secondary">
       Arrive :  {row.Arrive}
     </Typography>
     <Typography sx={{ mb: 1.0 }} color="text.secondary">
       Price :  {row.Price}
     </Typography>
     <Typography sx={{ mb: 1.0 }} color="text.secondary">
       From :  {row.From}        To :  {row.To}
     </Typography>
 
   </CardContent>
   <CardActions>
     {/* <Button size="large" variant="contained">Book Now</Button> */}
     <Link to="/tickets"><Button variant="outlined"
     onClick={()=>ticketBooking(row._id)}
     >Book Now<HiOutlineTicket size='2rem'color="red"/></Button></Link>
   </CardActions>
 </Card>

     </Grid>
   ))}

 </Grid>
    </Grid>
    
    </>
  );
 
 };


 

export default FlightComponent;