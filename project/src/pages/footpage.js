import React,{useState,useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import GestureIcon from '@mui/icons-material/Gesture';
import axios from 'axios';
export default function Footer () {
  const [loginstatus,setLoginstatus]=useState(false)
  useEffect(()=>
    {
      axios.get(`${process.env.REACT_APP_APILINKS}/navbar`,{ withCredentials: true }).then((res)=>
        {
          if(res.status===200)
          {
          setLoginstatus(true)
          }
          else
          {
            setLoginstatus(false);
          }
        }).catch((err)=>
        {
          console.log('Nav Bar API error: '+err);
          setLoginstatus(false);
        })
  
    })

  return (
    <Box sx={{ backgroundColor: '#b71c1c', py: 2, mt: 4, textAlign: 'center' }}>
      <Box sx={{zIndex:2,float:"left",position:"absolute",mt:2,borderTop:"solid #b71c1c",ml:4}}>
          
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.344782034372!2d83.9889717734345!3d18.377152882688744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c415fca4183eb%3A0x26768baf68b6e58c!2zSGFudW1hbiBTdGF0dWUgKDE3MCBmZWV0KSAsIE1hZGFwYW0sIFNyaWtha3VsYW0gKFdvcmxkJ3MgVGFsbGVzdCBIYW51bWFuKSDgsIbgsILgsJzgsKjgsYfgsK_gsLjgsY3gsLXgsL7gsK7gsL8g4LC14LC_4LCX4LGN4LCw4LC54LCCLCDgsK7gsKHgsKrgsL7gsII!5e0!3m2!1sen!2sin!4v1729218401975!5m2!1sen!2sin" width="auto" height="250"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </Box>
          <Box component="img" src="logo1.png" sx={{
            width: "100px",
            height: "auto",
            filter: "drop-shadow(0px 4px 10px white)",
          }}/>
        <Typography sx={{fontWeight:"700",fontsize:"13px",fontfamily:"script",color:"blacj",mt:1,mb:1}}>A single pint can save three lives, a single gesture can create a million smiles.
        </Typography>
      <Box sx={{display:"flex",flexDirection:"row",textAlign:"center",justifyContent:"center"}}>
      {!loginstatus ? (
          <>
            <Link to="/" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left",ml:5 }}>Home</Typography></Link>
            <Link to="/login" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600 ,textAlign:"left",ml:5}}>Login</Typography></Link>
            <Link to="/registration" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left",ml:5 }}>Register</Typography></Link>
            <Link to="/contact" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left",ml:5 }}>Contact Us</Typography></Link>

          </>
        ) : (
          <>
            <Link to="/" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left",ml:5 }}>Home</Typography></Link>
            <Link to="/donateblood" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left" ,ml:5}}>Donate Blood</Typography></Link>
            <Link to="/bloodrequest" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left",ml:5 }}>Need Blood</Typography></Link>
            <Link to="/contact" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left",ml:5 }}>Contact Us</Typography></Link>
            <Link to="/logout" style={{textDecoration:"none",color:"white"}}><Typography variant='body1' sx={{ fontFamily: "times", fontSize: "20px", fontWeight: 600,textAlign:"left",ml:5 }}>Logout</Typography></Link>

          </>
        )}
    </Box>
    <Box>
      <Typography variant='h6' sx={{fontWeight:"800",fontFamily:"script",mt:2,textAlign:"center"}}>Connect With Us</Typography>
      <Box sx={{display:"flex",textAlign:"center",justifyContent:"center",mt:1}}>
        <Link to="https://www.instagram.com/sai__salaar/?next=https%3A%2F%2Fwww.instagram.com%2Fp%2F5HqFR8EsZz%2Fliked_by%2F%3F__coig_login%3D1">
        <InstagramIcon sx={{padding:"5px 15px",color:"white"}}/></Link>
        <Link to="https://www.facebook.com/sai.parla.52">
        <FacebookIcon sx={{padding:"5px 15px",color:"white"}}/></Link>
        <XIcon sx={{padding:"5px 15px",color:"white"}}/>
        <Link to="mailto:saiparla0702gmail.com">
         <EmailIcon sx={{padding:"5px 15px",color:"white"}}/></Link>
         <Link to="https://www.threads.net/@sai__salaar?hl=da">
         <GestureIcon sx={{padding:"5px 15px",color:"white"}}/></Link>
      </Box>
    </Box>
    <Typography variant="body2" color="textSecondary"sx={{mt:3}}>
        © sai parla . All Rights Reserved.
      </Typography>
    </Box>
  );
};

