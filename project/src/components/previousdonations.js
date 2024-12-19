import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import axios from "axios";

export default function Previousdonations() {
  const [donationDetails, setDonationDetails] = useState({
    donorname: "",
    bloodtype: "",
    donationdate: "",
    hospital: "",
  });
  const previous=()=>
  {
    axios.get(`${process.env.REACT_APP_APILINKS}/oldblood`,{ withCredentials: true }).then((res)=>
    {
      if(res.status===200)
      {
        setDonationDetails({
          donorname: res.data.name,
          bloodtype: res.data.bloodgroup,
        });
      }
    }).catch((err)=>
    {
      alert(err);
    })
  }


  useEffect(() => {
    previous();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails({ ...donationDetails, [name]: value });
  };

  const submit = () => {
    
  };

  return (
    <Container>
      <Box
        component="form"
        method="post"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 10,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'times' }}>
          Previous Donation Details
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          <TextField
            label="Donor Name"
            name="donorname"
            type="text"
            value={donationDetails.donorname}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Blood Group"
            name="bloodtype"
            type="text"
            value={donationDetails.bloodtype}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Donation Date"
            name="donationdate"
            type="date"
            value={donationDetails.donationdate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
            sx={{ mt: 2 }}
          />
          <TextField
            label="Hospital Name"
            name="hospital"
            type="text"
            value={donationDetails.hospital}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1, backgroundColor: '#b71c1c' }}
            onClick={submit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
