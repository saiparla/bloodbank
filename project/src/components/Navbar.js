import { AppBar, Button,Paper, Toolbar, Box,MenuItem,MenuList, Typography,Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import CallIcon from '@mui/icons-material/Call';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";

export default function Nav() { 
  const [loginstatus,setLoginstatus]=useState(false)
  const [donatemenu,setDonatemenu]=useState(false)
  const [recievingoptionmenu,setRecievingoptionmenu]=useState(false)
  const [profilemenu,setProfilemenu]=useState(false);
  const [username,setUsername]=useState({username:""});

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
      if(loginstatus)
      {
      axios.get(`${process.env.REACT_APP_APILINKS}/oldblood`,{withCredentials:true}).then((res)=>
        {
          if(res.status===200)
          {
            setUsername({
              username:res.data.name
            })
          }
        }).catch((err)=>
        {
          console.log(err);
        })
      }

      axios.get(`${process.env.REACT_APP_APILINKS}/signleuser/${'2'}`).then(res=>{
        console.log(res.data)
      })
      
  })
  const profileoptionopen=()=>
  {
    setProfilemenu((open)=>!open);
    setDonatemenu(false);
    setRecievingoptionmenu(false)
  }

  const donateoptionsopen =()=>
  {
    setDonatemenu((openstate)=>!openstate);
    setProfilemenu(false)
    setRecievingoptionmenu(false);

  }
  const recievingoptionopen =()=>
  {
    setRecievingoptionmenu((openstate)=>!openstate);
    setProfilemenu(false);
    setDonatemenu(false)
  }
  const menuclose=()=>
  {
    setDonatemenu(false);
    setProfilemenu(false);
    setRecievingoptionmenu(false);
  }

  return (
    <Box sx={{ position: "fixed", width: "100%", top: 0 ,zIndex:2}}>
      <Link to="/">
        <Box
          component="img"
          src="logo1.png"
          sx={{
            width: "100px",
            height: "auto",
            position: "fixed",
            left: "2%",
            filter: "drop-shadow(0px 4px 10px white)",
            zIndex: 2,
          }}
        />
      </Link>

      <AppBar sx={{ background: "#b71c1c", zIndex: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-evenly", ml: "15%" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white", width: "15%", fontFamily: "Times", fontSize: "18px" }} onClick={menuclose} variant="null">
              <HomeIcon sx={{ mb: 0.5, mr: 1 }} /> Home
            </Button>
          </Link>

          {loginstatus ? (
            <>
          <Box onClick={recievingoptionopen}   sx={{width:"25%",position:"relative"}}>
                  <Button sx={{ color: "white", width: "100%", fontFamily: "Times", fontSize: "18px" }} variant="null">
                  Recieveing Section<ExpandMoreIcon fontSize="" sx={{ mb: 0.5, ml: 1, transform: recievingoptionmenu ? 'rotate(180deg)' : 'rotate(0deg)' }} /> 
                  </Button>
                {recievingoptionmenu && (
                  <Paper sx={{ position: "absolute", backgroundColor: "#b71c1c", mt: 1.7, zIndex: 3 ,width:"100%"}}>
                    <MenuList>
                      <MenuItem  sx={{ color: "white", fontFamily: "Times", fontSize: "19px",fontweight:"700",width:"relative",justifyContent:"center"}}>
                      <Link to="/bloodrequest" style={{ textDecoration: "none" ,color:"white"}}>
                      Request blood 
                        </Link>
                      </MenuItem>
                      <MenuItem sx={{ color: "white", fontFamily: "Times", fontSize: "19px",fontweight:"700",width:"relative",justifyContent:"center"}}>
                        <Link to="/availabledonors" style={{ textDecoration: "none", color: "white" }}>
                          Available Donors
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                )}
              </Box>
              <Box onClick={donateoptionsopen}   sx={{width:"25%",position:"relative"}}>
                  <Button sx={{ color: "white", width: "100%", fontFamily: "Times", fontSize: "18px" }} variant="null">
                  Donating Section<ExpandMoreIcon fontSize="" sx={{ mb: 0.5, ml: 1, transform: donatemenu ? 'rotate(180deg)' : 'rotate(0deg)' }} /> 
                  </Button>
                {donatemenu && (
                  <Paper sx={{ position: "absolute", backgroundColor: "#b71c1c", mt: 1.7, zIndex: 3 ,width:"100%"}}>
                    <MenuList>
                      <MenuItem  sx={{ color: "white", fontFamily: "Times", fontSize: "19px",fontweight:"700",width:"relative",justifyContent:"center",textWrap:"wrap"}}>
                      <Link to="/donateblood" style={{ textDecoration: "none" ,color:"white"}}>
                      Donate blood 
                        </Link>
                      </MenuItem>
                      <MenuItem sx={{ color: "white", fontFamily: "Times", fontSize: "19px",fontweight:"700",width:"relative",justifyContent:"center",textWrap:"wrap"}}>
                        <Link to="/needyusers" style={{ textDecoration: "none", color: "white" }} >
                          Needy Users
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                )}
              </Box>
              
              <Link to="/contact" style={{ textDecoration: "none",width:"18%" }} >
                <Button sx={{ color: "white", width: "100%", fontFamily: "Times", fontSize: "18px",textWrap:"wrap" }} variant="null" onClick={menuclose}>
                  <CallIcon sx={{ mb: 0.5, mr: 1 }} /> Contact Us
                </Button>
              </Link>
             <Box onClick={profileoptionopen} sx={{ width: "15%", position: "relative" }}>
  <Button sx={{ color: "white", width: "100%", fontFamily: "Times", fontSize: "18px", borderRadius: "50%" }} variant="null">
    <PersonIcon fontSize="large" sx={{ borderRadius: "50%", border: "1px solid white" }} />
  </Button>
  
  {profilemenu && (
    <Paper sx={{
      position: "absolute",
      backgroundColor: "white",
      mt: 2,  
      right: 0,
      zIndex: 3,
      width: "200px",
      boxShadow: 3,
    }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ fontFamily: "script", mt: 2, fontWeight: "600", color: "#b71c1c", textAlign: "center" }}>
          Welcome
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: "script", mt: 1, fontWeight: "600", color: "black", textAlign: "center" }}>
          {username.username}
        </Typography>
      </Box>
      <MenuList>
        <MenuItem sx={{ color: "#b71c1c", fontFamily: "Times", fontSize: "19px", fontWeight: "700", width: "100%", justifyContent: "center" }}>
          <Link to="/edituser" style={{ textDecoration: "none", color: "#b71c1c" }}>
            Edit User
          </Link>
          </MenuItem>
          <MenuItem sx={{ color: "#b71c1c", fontFamily: "Times", fontSize: "19px", fontWeight: "700", width: "100%", justifyContent: "center" }}>
          <Link to="/changepassword" style={{ textDecoration: "none", color: "#b71c1c" }}>
            Change Password
          </Link>
        </MenuItem>
        <MenuItem sx={{ color: "#b71c1c", fontFamily: "Times", fontSize: "19px", fontWeight: "700", width: "100%", justifyContent: "center" }}>
          <Link to="/previousdonations" style={{ textDecoration: "none", color: "#b71c1c" }}>
            Previous Donations
          </Link>
        </MenuItem>
        <MenuItem sx={{ color: "#b71c1c", fontFamily: "Times", fontSize: "19px", fontWeight: "700", width: "100%", justifyContent: "center" }}>
          <Link to="/logout" style={{ textDecoration: "none", color: "#b71c1c" }}>
            Logout
          </Link>
        </MenuItem>
        
        
      </MenuList>
    </Paper>
    
  )}
  
</Box>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white", width: "max-content", fontFamily: "Times", fontSize: "18px" }} variant="null">
                  <LoginIcon sx={{ mb: 0.5, mr: 1 }} /> Login
                </Button>
              </Link>
              <Link to="/registration" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white", width: "max-content", fontFamily: "Times", fontSize: "18px" }} variant="null">
                  <CreateIcon sx={{ mb: 0.5, mr: 1 }} /> Register?
                </Button>
              </Link>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "white", width: "max-content", fontFamily: "Times", fontSize: "18px" }} variant="null">
                  <CallIcon sx={{ mb: 0.5, mr: 1 }} /> Contact Us
                </Button>
              </Link>
             
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
