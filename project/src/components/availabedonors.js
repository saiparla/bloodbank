import { Container, Typography, TextField, MenuItem, Button, Box, Table, TableHead, TableCell, TableBody, TableRow, InputAdornment } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Needed() {
  const [tabledata, setTabledata] = useState([]);
  const [filter, setFilter] = useState({ searchwith: "city", search: "" });
  const [data,setData]=useState({Donorname:"",email:"",contact:""})
  const handler = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredata = tabledata.filter((donor) => {
    if (!filter.search.trim()) return true;

    if (filter.searchwith === "name") {
      return donor.Donorname.toLowerCase().includes(filter.search.toLowerCase());
    } else if (filter.searchwith === "contact") {
      return donor.contact.includes(filter.search);
    } else if (filter.searchwith === "city") {
      return donor.city.toLowerCase().includes(filter.search.toLowerCase());
    }else if(filter.searchwith==="bloodGroup"){
      return donor.bloodGroup.toLowerCase().includes(filter.search.toLowerCase());
    }
    return true;
  });

  const fetchtabledata = () => {
    axios
      .get(`${process.env.REACT_APP_APILINKS}/tabledata`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // alert("Data fetched");
          setTabledata(res.data);
          // console.log(res.data)
        }
      })
      .catch(() => alert("Data fetch failed"));
  };

  useEffect(() => {
    fetchtabledata();
  }, []);
  const request = (donor) => {
    const requestdata={
      Donorname:donor.Donorname,
      email:donor.email,
      contact:donor.contact
    }
    console.log(requestdata);
    // console.log(email);
    // console.log(contact);
  };

  return (
    <Container sx={{ mt: 10 }}>
        <Typography variant='h4' sx={{textAlign:"center",fontweight:"700",fontFamily:"script"}}>Donor Data</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" ,mt:2}}>
        <TextField
          select
          name="searchwith"
          label="Search By"
          value={filter.searchwith}
          onChange={handler}
          sx={{ borderRadius: "5px", width: "300px", mt: 1, mb: 2 }}
        >
          <MenuItem value="city" selected>City</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="bloodGroup">Blood group</MenuItem>
          <MenuItem value="contact">Contact</MenuItem>
        </TextField>
        <Box>
          <TextField
            name="search"
            label="Search Donor"
            placeholder="Search donor"
            value={filter.search}
            onChange={handler}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ borderRadius: "5px", width: "400px", mt: 1, mb: 2 }}
          />
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>S.No</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>Contact Number</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>Blood Group</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>City</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredata.map((donor, index) => (
            <TableRow key={donor.id}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff",
              '&:hover': {
                backgroundColor: "#e0f7fa", 
              },
            }}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{donor.Donorname}</TableCell>
              <TableCell>{donor.contact}</TableCell>
              <TableCell>{donor.bloodGroup}</TableCell>
              <TableCell>{donor.city}</TableCell>
              <TableCell>{donor.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
