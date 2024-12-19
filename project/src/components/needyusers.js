import { Container, Typography, TextField, MenuItem, Button, Box, Table, TableHead, TableCell, TableBody, TableRow, InputAdornment } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Needed() {
  const [tabledata, setTabledata] = useState([]);
  const [filter, setFilter] = useState({ searchwith: "bloodGroup", search: "" });

  const handler = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredata = tabledata.filter((donor) => {
    if (!filter.search.trim()) return true;
  
    if (filter.searchwith === "name") {
      return donor.patient_name.toLowerCase().includes(filter.search.toLowerCase());
    }else if (filter.searchwith === "hospital") {
      return donor.hospital.toLowerCase().includes(filter.search.toLowerCase());
    } else if (filter.searchwith === "bloodGroup") { 
        return donor.bloodgroup.toLowerCase().includes(filter.search.toLowerCase()); 
    }
    return true;
  });
  

  const fetchtabledata = () => {
    axios
      .get(`${process.env.REACT_APP_APILINKS}/neededdata`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // alert("Data fetched");
          setTabledata(res.data);
        }
      })
      .catch(() => alert("Data fetch failed"));
  };


  useEffect(() => {
    fetchtabledata();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear() ; 
    return `${day}/${month < 10 ? '0' + month : month}/${year}`;
  };
  

  return (
    <Container sx={{ mt: 10 }}>
        <Typography variant='h4' sx={{textAlign:"center",fontweight:"700",fontFamily:"script"}}>Blood Needed People</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" ,mt:2}}>
        <TextField
          select
          name="searchwith"
          label="Search By"
          value={filter.searchwith}
          onChange={handler}
          sx={{ borderRadius: "5px", width: "300px", mt: 1, mb: 2 }}
        >
          <MenuItem value="bloodGroup">Blood Group</MenuItem>
          <MenuItem value="hospital">hospiatl</MenuItem>
          <MenuItem value="name">Name</MenuItem>
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
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>Required Date</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>Contact Number</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>Blood Group</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>hospiatl</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "script", fontSize: "18px" }}>cause</TableCell>
          </TableRow>
          
        </TableHead>
        <TableBody>
          {filteredata.map((donor, index) => (
            <TableRow key={donor.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{donor.patient_name}</TableCell>
              <TableCell>{formatDate(donor.requireddate)}</TableCell>
              <TableCell>{donor.contact}</TableCell>
              <TableCell>{donor.bloodgroup}</TableCell>
              <TableCell>{donor.hospital}</TableCell>
              <TableCell>{donor.cause}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
