import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from "axios";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './reg.css';

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const nav = useNavigate();
  // const [username,setUsername]=useState('');

  const handler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_APILINKS}/login`, data,{withCredentials:true})
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Success",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>
          {
            nav('/');
            window.location.reload()
          });
        } else if (res.status === 201) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong password!",
          });
        } else if (res.status === 202) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email not found!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server error or network issue!",
        });
        console.error('Login error:', err);
      });
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 15 }}>
        <Typography variant="h4" sx={{ fontWeight: "600", fontFamily: "times" }}>
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handler}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#b71c1c" }}
            onClick={submit}
          >
            Login
          </Button>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Link to="/forgot" style={{ textDecoration: "none", color: "black" }}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <u>Forgot password?</u>
              </Typography>
            </Link>
            <Link to="/registration" style={{ textDecoration: "none", color: "black" }}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <u>Don't have an account? Sign Up</u>
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
