  import { Box, Container,MenuItem,TextField,Typography,Checkbox,FormControlLabel,Button } from '@mui/material'
  import React, { useState } from 'react'
  import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
  import axios from 'axios';
  import Swal from 'sweetalert2';

  export default function Donateblood() {
      const initialState = {
        register: "select",
        Donorname: "",
        age: "",
        gender: "select",
        bloodGroup: "select",
        city: "select",
        contact: "",
        email: "",
        healthstatus: "select",
        habbits: "select",
        consent: false,
      };
    
      const [donordata, setDonordata] = useState(initialState);
    
      const handler = (e) => {
        const { name, value, type, checked,files } = e.target;
        setDonordata({ ...donordata, [name]: type === 'checkbox' ? checked : files ? files[0]:value });

      };
    
      const submit = (e) => {
        e.preventDefault();
    
        if (donordata.consent) {
        
        if(donordata.habbits==="no" || donordata.habbits ==="select")
        {
          Swal.fire("you are unable to donate blood as you are not a teetotaler!");
        }
        else if(donordata.healthstatus === "no" || donordata.healthstatus === "select")
        {
          Swal.fire("you are unable to  donate blood as you are not healthy");
        }
        else if(donordata.gender === "select")
        {
          Swal.fire("Please select your Gender");
        }
        else if(donordata.bloodGroup === "select")
        {
          Swal.fire("Please select your bloodgroup");
        }
        else if(donordata.city === "select")
        {
          Swal.fire("Please select your Gender");
        }

        else{
          axios.post('http://localhost:7000/donateblood', donordata).then((res) => {
            if (res.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Donor datails added",
                showConfirmButton: false,
                timer: 1500
              });
              setDonordata(initialState);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          }).catch((err) => {
            Swal.fire({
              title: "The Internet?",
              text: "That thing is still around?",
              icon: "question"
            });
          });
        
        }} else {
          alert("Please click the checkbox to give consent.");
        }
      };
    return (
      <Container component="form" method="post" onSubmit={submit}
      sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
          <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'times' }}>
          Blood Donation Form
          </Typography>
          <Box sx={{ mt: 1, width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
              select
              label="Registering for"
              name= "register"
              fullWidth
              variant='outlined'
              required
              helperText="For whom you are registering?"
              onChange={handler}
              value={donordata.register}
              >
                  <MenuItem value="select" disabled>Select</MenuItem>
                  <MenuItem value="myself">For Myself</MenuItem>
                  <MenuItem value="others">For Others</MenuItem>
              </TextField>
              <TextField
              label="Donor Name"
              name='Donorname'
              type='text'
              fullWidth
              required
              helperText="Please enter Donor Name"
              onChange={handler}
              value={donordata.Donorname}
  />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
              label="Donor Age"
              name= "age"
              fullWidth
              variant='outlined'
              required
              helperText="Please Enter Your Age"
              onChange={handler}
              value={donordata.age}
              />
              <TextField
              select
              label="Donor Gender"
              name='gender'
              type='text'
              fullWidth
              required
              helperText="Please enter Donor Name"
              onChange={handler}
              value={donordata.gender}
              >
                  <MenuItem value="select" selected disabled>Select</MenuItem>
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
                helperText="Please select  Blood Group"
                onChange={handler}
                value={donordata.bloodGroup}
              >
                <MenuItem value="select" disabled >select</MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </TextField>
                <TextField select
                  
                  label="Select nearest city"
                  name="city"
                  required fullWidth
                  variant="outlined"
                  helperText="Please select your city"
                  onChange={handler}
                  value={donordata.city}
                >
                  <MenuItem value="select" disabled>select</MenuItem>
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
            <Box  sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="Donor Contact Number"
              name= "contact"
              fullWidth
              variant='outlined'
              required
              helperText="Please enter contact Number"
              onChange={handler}
              value={donordata.contact}
              />
              <TextField
              label="Donor Email"
              name='email'
              type='email'
              fullWidth
              helperText="Please enter Donor email(optional)"
              onChange={handler}
              value={donordata.email}/>
          </Box>
          <Box  sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              select
              label="Are You Healthy?"
              name= "healthstatus"
              fullWidth
              variant='outlined'
              required
              onChange={handler}
              value={donordata.healthstatus}
              >
                  <MenuItem value="select" disabled>Select</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">NO</MenuItem>

              </TextField>
              <TextField
              select
              label="Are You a teetotaler?"
              name= "habbits"
              fullWidth
              variant='outlined'
              required
              onChange={handler}
              value={donordata.habbits}
              >
                  <MenuItem value="select" disabled>Select</MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">NO</MenuItem>

              </TextField>
          </Box>
          
          <FormControlLabel sx={{ml:1}}
          control={<Checkbox size="medium"  name='consent' onChange={handler} value={donordata.consent}/>}
          label={
            <Typography variant="body2">
            Giving blood is my choice,a gift from the heart that I offer freely to those in need.
            </Typography>
          }/>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={submit}
              sx={{ mt: 1, mb: 1, backgroundColor: '#b71c1c' }}
              // onChange={handler}
            >
              <VolunteerActivismIcon sx={{mb:0.5,mr:1}}/>
              Ready to Donate
            </Button>
          </Box>
      </Container>
    )
  }
