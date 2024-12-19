import { Box,Card,CardContent,Typography,Table,TableBody,TableHead,TableCell,TableRow, colors} from "@mui/material";
import React from "react";
import './homepage.css'


export default function Home()
{
    const rows = [
        { bloodType: 'A+', give: 'A+, AB+', take: 'A+, A-, O+, O-' },
        { bloodType: 'A-', give: 'A-, A+, AB+, AB-', take: 'A-, O-' },
        { bloodType: 'B+', give: 'B+, AB+', take: 'B+, B-, O+, O-' },
        { bloodType: 'B-', give: 'B-, B+, AB+, AB-', take: 'B-, O-' },
        { bloodType: 'AB+', give: 'AB+', take: 'All blood types' },
        { bloodType: 'AB-', give: 'A+, A-, AB+, AB-', take: 'AB-, A-, B-, O-' },
        { bloodType: 'O+', give: 'O+, A+, B+, AB+', take: 'O+, O-' },
        { bloodType: 'O-', give: 'All Blood Types', take: 'O-' },
      ];
       
    return(
        <Box sx={{backgroundColor:"#f2f0ef"}}>
        <Box sx={{border:"solid",mt:8,height:"300px",overflow:"hidden"}} >
            <Box sx={{mt:15,zIndex:1,position:"absolute",textAlign:"center",ml:"25%",color:"#1c0a56   "}}> 
        <Typography variant="h4" gutterBottom sx={{width:0,filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 1))",fontWeight:900,fontFamily:"times",overflow:"hidden",whiteSpace: "nowrap",animation:"typing1 4s"}}>
        Welcome to the Online Blood Bank System
      </Typography>
        <Typography gutterBottom variant="h5" sx={{filter: "drop-shadow(0px 4px 10px rgba(0, 0, 0, 1))",width:0,fontWeight:900,fontFamily:"times",overflow:"hidden",whiteSpace: "nowrap",animation:"typing 2s ",animationDelay:"1s"}}>
        A single pint can save three lives, a single gesture can create a million smiles.
        </Typography>
      </Box>
           <Box  sx={{display:"flex",flexDirection:"row",animation:"slider 20s linear infinite",height:"100%",width:"400%",filter:"blur(0px)"}}>
           <Box component="img" src="121.jpg"  sx={{position:"relative",width:"25%",height:"100%"}}/>
           <Box component="img" src="blood2.webp"  sx={{position:"relative",width:"25%",height:"100%"}}/>
           <Box component="img" src="logo.png"  sx={{position:"relative",width:"25%",height:"100%"}}/>
           <Box component="img" src="122.png"  sx={{position:"relative",width:"25%",height:"100%"}}/>
            </Box>
            
        </Box>
        {/* <Box sx={{display:"flex",justifyContent:"space-around",mt:2,backgroundSize:"cover",backgroundRepeat:"no-repeat",backdropFilter:"blur(20px)",height:"160px",backgroundColor:"#fff3e0"}}>
            <Box sx={{width:"300px",height:"130px",border:"1px solid black",display:"flex",justifyContent:"space-evenly",backgroundColor:"#322266 ",borderRadius:"20px",mt:1.7}}>
               <Typography sx={{mt:3,fontWeight:"600",fontFamily:"times",color:"whitesmoke",width:"100px",textAlign:"center"}}>Number of Donors</Typography> 
            </Box>
            <Box sx={{width:"300px",height:"130px",border:"1px solid black",fontWeight:"600",fontFamily:"times",display:"flex",justifyContent:"space-evenly",backgroundColor:"#322266",borderRadius:"20px",mt:1.7}}>
               <Typography sx={{mt:2,fontWeight:"600",fontFamily:"times",color:"whitesmoke",width:"100px",textAlign:"center"}} >Number of units collected</Typography>
            </Box>
        </Box> */}
        
        <Box sx={{backgroundColor:"#d32f2f"}}>
            <Typography variant="h4" sx={{textAlign:"center",fontSize:"20px",fontWeight:600,fontFamily:"script",mt:2,mb:2,color:"white"}}>Types Of Blood Donantion</Typography>
        <Box sx={{display:"flex",textAlign:"center",justifyContent:"space-around"}}>
            
            <Card sx={{width:"22%",mb:3}}>
                <CardContent>
                    <Typography variant="h4" sx={{backgroundColor:"#f44336 ",fontSize:"18px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid black"}}  gutterBottom>Whole Blood</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff ",fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Easiest & Quickest Donation</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>A pint of Red & white cells,platelets & plasma</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script" ,mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Mainly trauma & surgery</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2}}gutterBottom>donate Every 56 days</Typography>

                </CardContent>
            </Card>
                        
            <Card sx={{width:"22%",mb:3}}>
                <CardContent>
                    <Typography variant="h4" sx={{backgroundColor:"#fff3e0 ",fontSize:"18px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid black"}}  gutterBottom>Red Cell</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff ",fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>only red cells are collected</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Trauma,surgery,anemia,blood loss & other disorders</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script" ,mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Carries oxygen to the body</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2}}gutterBottom>donate Every 112 days</Typography>

                </CardContent>
            </Card>            
            <Card sx={{width:"22%",mb:3}}>
                <CardContent>
                    <Typography variant="h4" sx={{backgroundColor:"#f44336 ",fontSize:"18px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid black"}}  gutterBottom>Plasma</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff ",fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>The liquid portion of blood</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Transports water & nutrients to the body tissue</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script" ,mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Burn victims & bleeding disorders</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2}}gutterBottom>donate Every 28 days</Typography>

                </CardContent>
            </Card>            
            <Card sx={{width:"22%",mb:3}}>
                <CardContent>
                    <Typography variant="h4" sx={{backgroundColor:"#fff3e0 ",fontSize:"18px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid black"}}  gutterBottom>Platelets</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff ",fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Small cell fragments made in the bone marrow</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2,borderBottom:"1px solid #919190"}} gutterBottom>prevents blood clot & fatal bleeding</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script" ,mt:2,borderBottom:"1px solid #919190"}} gutterBottom>Surgeries,transplants & cancer patients</Typography>
                    <Typography variant="h4" sx={{backgroundColor:"#fff " ,fontSize:"15px",fontWeight:600,fontFamily:"script",mt:2}}gutterBottom>donate Every 7 days</Typography>

                </CardContent>
            </Card>
            
            
        </Box>
        </Box>
        <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 3,mr:30 }}>
        Blood Type<br/> <span style={{color:"white",marginLeft:"300px",backgroundColor:"#30341e"}}>Compatability</span> Chart
      </Typography>
      
        <Table sx={{border:"solid"}}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#b71c1c' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold',textAlign:"center" }}>Blood Type</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold',textAlign:"center" }}>You Can Give Blood To </TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold',textAlign:"center" }}>You Can Get Blood From</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow sx={{ '&:nth-of-type(even)': { backgroundColor: '#fff3e0' } }}>
                <TableCell sx={{textAlign:"center",fontWeight:"bold"}}>{row.bloodType}</TableCell>
                <TableCell  sx={{textAlign:"left"}}>{row.give}</TableCell>
                <TableCell  sx={{textAlign:"left"}}>{row.take}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Box>
    </Box>
    
            
    )
}