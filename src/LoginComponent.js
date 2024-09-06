import React, { useState } from "react";
import { Typography, Button, TextField, Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaPlane, FaAngleDoubleRight } from 'react-icons/fa';

function LoginComponent() {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "", // Added for sign-up
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate authentication using local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === formData.email && u.password === formData.password);

        if (user) {
            // Save user info to local storage
            localStorage.setItem("currentUser", JSON.stringify(user));
            // Generate a dummy token
            const dummyToken = btoa(user.email + Date.now());
            localStorage.setItem("token", dummyToken);
            // Navigate to the flights page
            navigate("/tickets ");
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        if (users.some(user => user.email === formData.email)) {
            alert("User with this email already exists!");
            return;
        }

        const newUser = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Sign up successful! Please log in.");
        setTabValue(0); // Switch to login tab
    };

    return (
        <div style={{ margin: "10%", paddingLeft: "30%" }}>
            <Typography variant="h4" color="blue">
                Welcome <FaPlane color="Red" size="3rem" />
            </Typography>
            <br />
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 300 }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="Login" />
                    <Tab label="Sign Up" />
                </Tabs>
            </Box>
            {tabValue === 0 ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            id="filled-basic"
                            label="E MAIL"
                            variant="filled"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            sx={{ width: 300 }}
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            id="filled-basic"
                            label="PASSWORD"
                            variant="filled"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            sx={{ width: 300 }}
                        />
                    </div>
                    <br />
                    <Button variant="contained" type="submit">
                        SIGN IN <FaAngleDoubleRight size="2rem" />
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleSignUp}>
                    <TextField
                        label="Name"
                        variant="filled"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        sx={{ width: 300, marginTop: 2 }}
                    />
                    <TextField
                        label="E MAIL"
                        variant="filled"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        sx={{ width: 300, marginTop: 2 }}
                    />
                    <TextField
                        label="PASSWORD"
                        variant="filled"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        sx={{ width: 300, marginTop: 2 }}
                    />
                    <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
                        SIGN UP <FaAngleDoubleRight size="2rem" />
                    </Button>
                </form>
            )}
        </div>
    );
}

export default LoginComponent;
