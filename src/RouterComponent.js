import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import FlightComponent from "./FlightComponent";
import TicketComponent from "./TicketComponent";
// import TrailComponent from "./TrailComponent";

import TicketBookingComponent from "./TicketBookingComponent";
import Users from "./TicketBookingComponent";
import userDataComponent from "./userDataComponent";

function RouterComponent(){
    return(
        <BrowserRouter>
        <Routes>
           
             <Route path="/" element={<LoginComponent/>}/>  
            <Route path="/flights" element={<FlightComponent/>}/>
            <Route path="/tickets" element={<TicketComponent/>} />
            {/* <Route path="/trail" element={<TrailComponent/>} /> */}
            <Route path="/ticketbooking" element={<TicketBookingComponent/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/userData" element={<userDataComponent/>}/>
          
        </Routes>
        </BrowserRouter>
    )
}

export default RouterComponent;