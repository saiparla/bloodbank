import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [verifyButton, setVerifyButton] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', otp: '', newpassword: '', confirmpassword: '' });
  const [error, setError] = useState('');
  const [resendButton, setResendButton] = useState(false);

  useEffect(() => {
    // Fetch email on component load
    axios
      .get(`${process.env.REACT_APP_APILINKS}/oldblood`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setCredentials({ ...credentials, email: res.data.email });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const sendOTP = () => {
    if (!credentials.email) {
      Swal.fire("Error", "Email is required to send OTP", "error");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_APILINKS}/sendotp`, { email: credentials.email }, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Success", "OTP email sent successfully", "success");
          setVerifyButton(true);
        } else {
          Swal.fire("Error", "No user found with the email", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "An error occurred while sending the OTP email. Please try again.", "error");
      });
  };

  const verifyOTP = () => {
    if (!credentials.otp) {
      Swal.fire("Error", "OTP is required for verification", "error");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_APILINKS}/verifyotp`, { email: credentials.email, otp: credentials.otp })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire("Success", "OTP verified successfully", "success");
          setSubmit(true);
          setVerifyButton(false);
        } else if (res.status === 300) {
          Swal.fire("Error", "Invalid OTP. Please try again.", "error");
          setSubmit(false);
          setVerifyButton(false);
          setResendButton(true);
        }
      })
      .catch(() => {
        Swal.fire("Error", "OTP verification failed. Please check your OTP and try again.", "error");
      });
  };

  const updatePassword = () => {
    if (credentials.newpassword !== credentials.confirmpassword) {
      setError('Passwords do not match. Please enter correctly.');
      return;
    }

    axios
      .post(`${process.env.REACT_APP_APILINKS}/forgot`, credentials)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Password updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/login');
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Network error. Please try again later.", "error");
      });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 10,
          width: "600px"
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: '600', fontFamily: 'times' }}>
          Forgot Password
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={credentials.email}
            helperText="Enter your email address"
            onChange={handleInputChange}
            disabled
          />
          {!submit && (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                helperText="Enter your OTP"
                onChange={handleInputChange}
              />
              {!verifyButton ? (
                <Button
                  variant="contained"
                  sx={{ height: '55px', mt: 2, width: '200px', ml: 2, backgroundColor: '#8fce00', color: "black", fontWeight: 600 }}
                  onClick={sendOTP}
                >
                  Send OTP
                </Button>
              ) : resendButton ? (
                <Button
                  variant="contained"
                  sx={{ height: '55px', mt: 2, width: '200px', ml: 2, backgroundColor: '#FDEF83', color: "black", fontWeight: 600 }}
                  onClick={sendOTP}
                >
                  Resend OTP
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ height: '55px', mt: 2, width: '200px', ml: 2, backgroundColor: '#FDEF83', color: "black", fontWeight: 600 }}
                  onClick={verifyOTP}
                >
                  Verify
                </Button>
              )}
            </Box>
          )}
          {submit && (
            <>
              <TextField
                label="Create Password"
                name="newpassword"
                margin="normal"
                required
                fullWidth
                type='password'
                onChange={handleInputChange}
              />
              <TextField
                label="Confirm Password"
                name="confirmpassword"
                margin="normal"
                required
                fullWidth
                type='password'
                onChange={handleInputChange}
                helperText={error}
                error={!!error && error !== 'Password matched'}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                fullWidth
                onClick={updatePassword}
              >
                Submit
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
