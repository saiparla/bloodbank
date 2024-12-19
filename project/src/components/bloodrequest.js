import React from 'react';
import { Box, Container, TextField,Typography, Button, MenuItem} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Bloodrequest() {
    const initialState={
        patient: '',
        contact: '',
        requireddate: '',
        gender: '',
        hospital:'',
        bloodGroup: '',
        cause:'',
        city: '',
      };
      const [patientdata,setPatientdata]=useState(initialState);
      const handler = (e) => {
        const { name, value} = e.target;
        setPatientdata({ ...patientdata, [name]: value });  };
        const submit =(e)=>
        {
            e.preventDefault();
            console.log(patientdata);
            axios.post(`${process.env.REACT_APP_APILINKS}/requestblood`,patientdata).then((res)=>
                {
                  if(res.status===200){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "user added",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      setPatientdata(initialState);
                 }
                 else{
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                      });
                 }
                }).catch((err)=>
                {
                  Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "question"
                  });
        })
    };
  return (
    <Container>
      <Box component="form" method='post'
      onSubmit={submit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 10,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'times' }}>
          Blood Request Form
        </Typography>
        <Box sx={{ mt: 1, width: '100%'}}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Patient Name"
              name="patient"
              type="text"
              fullWidth
              required
              helperText="Please Enter Patient Name"
              onChange={handler}
              value={patientdata.patient}
            />
            <TextField
              label="Contact Number"
              name="contact"
              type="tel"
              fullWidth
              required
              helperText="Please Enter Patient Conact Number"
              onChange={handler}
              value={patientdata.contact}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Required Date"
              name="requireddate"
              type="date"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Please enter your Blood required Date"
              onChange={handler}
              value={patientdata.requireddate}
            />
            <TextField
              select
              label="Gender"
              name="gender"
              fullWidth
              variant="outlined"
              required
              helperText="Please Select Patient Gender"
              onChange={handler}
              value={patientdata.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Hospital Name"
              name="hospital"
              type="text"
              fullWidth
              required
              helperText="Please Enter Hospital Name"
              onChange={handler}
              value={patientdata.hospital}
            />
            <TextField
              select
              label="Blood Group"
              name="bloodGroup"
              fullWidth
              variant="outlined"
              required
              helperText="Please Select Patient Blood Group"
              onChange={handler}
              value={patientdata.bloodGroup}
            >
                <MenuItem value="select" defaultValue="select" disabled>select</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </TextField>
              
            
            </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
              label="Cause of Requirement"
              name="cause"
              type="text"
              fullWidth
              required
              helperText="Please enter your Email"
              onChange={handler}
              value={patientdata.cause}
            />
              <TextField select
                
                label="Select your city"
                name="city"
                required fullWidth
                variant="outlined"
                helperText="Please select your city"
                onChange={handler}
                value={patientdata.city}
              >
                <MenuItem value="select" defaultValue="select" disabled>select</MenuItem>
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
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // onClick={submit}
            sx={{ mt: 1, mb: 1, backgroundColor: '#b71c1c' }}
            // onChange={handler}
          >
            Seek Blood
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
