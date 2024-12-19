import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import './contactus.css';

export default function Contactus() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt:15
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '600px',
          boxShadow: 2,
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'black', mb: 2 ,backdropFilter:"blur(10px)"}}>
          <CallIcon fontSize="large" sx={{ mt: 0.7, mr: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'times', mt: 0.5 }}>
            Contact Us
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: '600', mb: 2 }}>
          Save Blood Bank
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Address: Save Blood Bank, Srikakulam, AP</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Phone: +91 7093535963</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <SendIcon sx={{ mr: 1 }} />
          <Typography variant="body1">Email: Savebloodbank@bloodbank.com</Typography>
        </Box>

        <Typography variant="body1">Website: www.savebloodbank.com</Typography>
      </Box>
    </Container>
  );
}
