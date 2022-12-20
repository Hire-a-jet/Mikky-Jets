import React, { useState } from "react";
import { Typography,Button,TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {FaPlane, FaAngleDoubleRight} from 'react-icons/fa';


function LoginComponent(){

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        email:"" , password:"",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        const response = await axios.post("http://localhost:3005/register/signin",{...formData});
        console.log(response);
        if(response.data){
            localStorage.setItem("token",response.data);
            navigate("/flights");
        }
    }; 

    // const handleSignup =async (e) => {
    //     e.preventDefault();
    //     // const response = await axios.post("http://localhost:3005/register/signup",{...formData});
    //     // console.log(response);
    //     // if(response.data){
    //     //     localStorage.setItem("token",response.data);
    //         navigate("/flights");
    //     // }

    // }

    return(<>
   <div >
   <div style={{margin:"10%",paddingLeft:"30%"}}>
        <Typography variant="h4" color="blue">Signin YourSelf<FaPlane color="Red" size='3rem'/></Typography><br/>
        <form onSubmit={handleSubmit}>
     
            <div><TextField id="filled-basic" label="E MAIL" variant="filled" type="email" name="email"
            value={formData.email} 
              onChange = {(e)=>setFormData({...formData,email:e.target.value})}
            sx={{ width:300}} /></div><br/>
            <div><TextField id="filled-basic" label="PASSWORD" variant="filled"  type="password" name="password"
            value={formData.password}
             onChange = {(e)=>setFormData({...formData,password:e.target.value})}
             sx={{ width:300}} /></div><br/>
            <Button variant="contained" type="submit">SIGN IN<FaAngleDoubleRight size='2rem'/></Button>
            {/* <p>You Not Exist User please <Button variant="contained" type="submit"
            onChange={(e)=>handleSignup()}>Sign Up</Button>YourSelf</p> */}
        </form>
    </div>
   </div>
    
    </>
       
    );

    };



export default LoginComponent;