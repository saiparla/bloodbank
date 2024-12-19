import { Container, Typography, Box, TextField, MenuItem, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditUser() {
  const [olddata, setOlddata] = useState({
    email: "",
    contact: "",
    bloodgroup: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_APILINKS}/oldblood`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setOlddata({
            email: res.data.email,
            contact: res.data.contact,
            bloodgroup: res.data.bloodgroup,
            city: res.data.city,
          });
        }
      })
      .catch((err) => {
        alert("Error fetching data: " + err.message);
      });
  }, []);
  const submit=(e)=>
    {
      e.preventDefault();
      axios.post(`${process.env.REACT_APP_APILINKS}/update`,olddata).then((res)=>
      {
        if(res.status===200)
        {
          Swal.fire("Success", "Details Updated successfully", "success")
        }
      }).catch((err)=>
      {
        Swal.fire("error"," Updation  failed", "error")
      })
  
    }

  const handler = (e) => {
    const { name, value } = e.target;
    setOlddata({ ...olddata, [name]: value });
  };

    return (
    <Container sx={{ mt: 10 }}>
      <Box component="form">
        <Typography
          variant="h4"
          sx={{ fontFamily: "script", fontWeight: "800", textAlign: "center" }}
        >
          Edit Details
        </Typography>
        <TextField
          label="Email Id"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={olddata.email}
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Contact"
          name="contact"
          type="number"
          fullWidth
          margin="normal"
          value={olddata.contact}
          onChange={handler}
        />
        <TextField
          select
          label="Blood Group"
          name="bloodgroup"
          fullWidth
          required
          margin="normal"
          value={olddata.bloodgroup}
          onChange={handler}
        >
          <MenuItem value="select" disabled>
            Select
          </MenuItem>
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
          label="Select Nearest City"
          name="city"
          required
          fullWidth
          margin="normal"
          value={olddata.city}
          onChange={handler}
        >
          <MenuItem value="select" disabled>
            Select
          </MenuItem>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={submit}
          sx={{ mt: 1, mb: 1, backgroundColor: "#b71c1c" }}
        >
          Update
        </Button>
      </Box>
    </Container>
  );
}
