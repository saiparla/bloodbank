import { Box, Container, TextField, FormControlLabel, Typography, Button, MenuItem, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import './reg.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();
  const initialState = {
    name: '',
    email: '',
    password: '',
    contact: '',
    DOB: '',
    gender: '',
    bloodGroup: '',
    city: '',
    consent: false
  };
  
  const [data, setData] = useState(initialState);

  const handler = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (data.consent) {
      axios.post(`${process.env.REACT_APP_APILINKS}/registration`, data).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User added",
            showConfirmButton: false,
            timer: 1500
          });
          setData(initialState);
          navigate('/login')
        } else if(res.status===409) {
          Swal.fire({
            icon: "error",
            title: "user exist",
            text: "User Already Exist!",
          });
        }
        else {
          Swal.fire({
            icon: "error",
            title: "error",
            text: "something went wrong!",
          });
        }


      }).catch((err) => {
        Swal.fire({
          title: "The Internet?",
          text: "That thing is still around?",
          icon: "question"
        });
      });
    } else {
      alert("Click the check box below");
    }
  };

  return (
    <Container>
      <Box
        component="form"
        method="post"
        onSubmit={submit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 10,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'times' }}>
          Registration Form
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Name"
              name="name"
              type="text"
              fullWidth
              required
              helperText="Please enter your Name"
              onChange={handler}
              value={data.name}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              helperText="Please enter your Email"
              onChange={handler}
              value={data.email}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              helperText="Please enter your Password"
              onChange={handler}
              value={data.password}
            />
            <TextField
              label="Contact Number"
              name="contact"
              type="tel"
              fullWidth
              required
              helperText="Please enter your Contact Number"
              onChange={handler}
              value={data.contact}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Date of Birth"
              name="DOB"
              type="date"
              inputMode='dd-mm-yy'
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Please enter your Date of Birth"
              onChange={handler}
              value={data.DOB}
            />
            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              variant="outlined"
              required
              helperText="Please select your Gender"
              onChange={handler}
              value={data.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              select
              label="Blood Group"
              name="bloodGroup"
              fullWidth
              variant="outlined"
              required
              helperText="Please select your Blood Group"
              onChange={handler}
              value={data.bloodGroup}
            >
              <MenuItem value="select" defaultValue="select" disabled>Select</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </TextField>
            <TextField
              select
              label="Select nearest city"
              name="city"
              required
              fullWidth
              variant="outlined"
              helperText="Please select your city"
              onChange={handler}
              value={data.city}
            >
              <MenuItem value="select" defaultValue="select" disabled>Select</MenuItem>
              <MenuItem value="Amadalavalasa">Amadalavalasa</MenuItem>
              <MenuItem value="Bhamini">Bhamini</MenuItem>
              <MenuItem value="Burja">Burja</MenuItem>
              <MenuItem value="Etcherla">Etcherla</MenuItem>
              <MenuItem value="Gara">Gara</MenuItem>
              <MenuItem value="Hiramandalam">Hiramandalam</MenuItem>
              <MenuItem value="Ichapuram">Ichapuram</MenuItem>
              <MenuItem value="Jalumuru">Jalumuru</MenuItem>
              <MenuItem value="Kanchili">Kanchili</MenuItem>
              <MenuItem value="Kaviti">Kaviti</MenuItem>
              <MenuItem value="Kotabommali">Kotabommali</MenuItem>
              <MenuItem value="Laveru">Laveru</MenuItem>
              <MenuItem value="Meliaputti">Meliaputti</MenuItem>
              <MenuItem value="Narasannapeta">Narasannapeta</MenuItem>
              <MenuItem value="Palakonda">Palakonda</MenuItem>
              <MenuItem value="Palasa">Palasa</MenuItem>
              <MenuItem value="Pathapatnam">Pathapatnam</MenuItem>
              <MenuItem value="Polaki">Polaki</MenuItem>
              <MenuItem value="Ponduru">Ponduru</MenuItem>
              <MenuItem value="Rajam">Rajam</MenuItem>
              <MenuItem value="Ranastalam">Ranastalam</MenuItem>
              <MenuItem value="Santhabommali">Santhabommali</MenuItem>
              <MenuItem value="Saravakota">Saravakota</MenuItem>
              <MenuItem value="Srikakulam">Srikakulam</MenuItem>
              <MenuItem value="Srikakulam Rural">Srikakulam Rural</MenuItem>
              <MenuItem value="Tekkali">Tekkali</MenuItem>
              <MenuItem value="Vangara">Vangara</MenuItem>
              <MenuItem value="Vajrapu Kotturu">Vajrapu Kotturu</MenuItem>
              <MenuItem value="Veeraghattam">Veeraghattam</MenuItem>
            </TextField>
          </Box>
          <Box>
            <FormControlLabel
              sx={{ ml: 1 }}
              control={<Checkbox size="medium" onChange={handler} name="consent" checked={data.consent} />}
              label={
                <Typography variant="body2">
                  I am registering of my own free will, driven by my genuine interest and commitment to supporting this blood bank.
                </Typography>
              }
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1, backgroundColor: '#b71c1c' }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
