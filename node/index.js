const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors({credentials:true,origin: process.env.CLIENT_URL }));
const jwt =require('jsonwebtoken')
const cookieparser = require('cookie-parser');
const nodemailer =require("nodemailer");
const crypto = require('crypto')
app.use(cookieparser());

const port = 7000;
const server = require('http').createServer(app);



const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});



connection.connect((err) => {
    if (!err) {
        console.log("connected");
    } else {
        console.log("not connected");
    }
});
const jwtkey =process.env.JWTSECRETKEY;


app.post('/forgot', (req, res) => {
    bcrypt.hash(req.body.confirmpassword, 10)
        .then((hashedpassword) => {
            connection.query(`UPDATE registration_data SET password="${hashedpassword}" WHERE email ='${req.body.email}'`, (err, result) => {
                if (!err) {
                    res.status(200).send('data fetched');
                } else {
                    res.status(401).send('error');
                    console.log('forgot error', err);
                }
            });
        }).catch((err) => {
            res.status(500).send('server error');
            console.log("forgot error", err);
        });
});
app.post('/update', (req, res) => {
    connection.query(
        'UPDATE registration_data SET contact="' + req.body.contact + '", bloodgroup="' + req.body.bloodgroup + '", city="' + req.body.city + '" where email="'+req.body.email+'"',
        (err, result) => {
            if (!err) {
                res.status(200).send('updated');
            } else {
                res.status(401).send('error');
                console.log('updation failed', err);
            }
        }
    );
});
app.post('/requestnotification',(req,res)=>
    {
        connection.query('insert into requestnotification(`requestefrom`,`requestedemail`,`requestedto`) values ("'+req.body.Donorname+'","'+req.body.email+'","'+req.userdata.email+'")',(err,res)=>
        {
            if(err)
            {
                console.log("request failed");
                res.status(300).send("request failed");
            }
            else
            {
                res.status(200).send("requested")
            }
        })
    })
app.post('/login', (req, res) => {
    connection.query(`SELECT email, password FROM registration_data WHERE email = "${req.body.email}"`, (err, results) => {
        if (!err) {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then((match) => {
                        if (match) {
                            //jwt token  creation
                            const token = jwt.sign(
                                { username: req.body.name,email: req.body.email, activitystatus: true },
                                jwtkey,
                                { expiresIn: "1h" }
                            );
                            //sent to cookies
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: process.env.TYPE,
                                sameSite: 'Strict',
                                maxAge: 60 * 60 * 1000
                            });
                            res.status(200).send("login successful");
                        } else {
                            res.status(201).send('Wrong password');
                        }
                    })
                    .catch(error => {
                        res.status(500).send('Server error');
                        console.error(error);
                    });
            } else {
                res.status(202).send("email not found");
            }
        } else {
            res.status(500).send('Server error');
            console.log('Login error:', err);
        }
    });
});
//middleware 
const  authenticationtoken=(req,res,next)=>
{
    const token = req.cookies.token;
    if(!token)
    {
        return res.status(401).send('access denied');
    }
    else
    {
        jwt.verify(token,jwtkey,(err,decoded)=>
        {
            if(err)
            {
                return res.status(403).send('invalid token')
            }
            else
            {
                req.userdata = decoded;
                next();
            }
        })
    }
}

app.get('/oldblood',authenticationtoken,(req,res)=>
    {
        connection.query(`select * from registration_data where email="${req.userdata.email}"`,(err,results)=>
        {
            if(!err)
            {
                res.status(200).json(results[0])
            }
            else
            {
                res.status(201).send('failed')
            }
        })
    })
    
app.post('/donateblood', (req, res) => {
    connection.query('INSERT INTO `donordata` (`register`, `Donorname`, `age`, `gender`, `bloodGroup`, `city`, `contact`, `email`, `healthstatus`, `habits`, `consent`) VALUES ("' + req.body.register + '", "' + req.body.Donorname + '", "' + req.body.age + '", "' + req.body.gender + '", "' + req.body.bloodGroup + '", "' + req.body.city + '", "' + req.body.contact + '", "' + req.body.email + '", "' + req.body.healthstatus + '", "' + req.body.habbits + '", "' + req.body.consent + '")', (err, row) => {
        if (!err) {
            res.status(200).send('user added');
        } else {
            res.status(403).send('error');
            console.log('donate blood: ', err);
        }
    });
});

app.post('/requestblood', (req, res) => {
    connection.query('INSERT INTO `requestblood` (`patient_name`, `contact`, `requireddate`, `gender`, `hospital`, `bloodgroup`, `cause`, `city`) VALUES ("' + req.body.patient + '", "' + req.body.contact + '", "' + req.body.requireddate + '", "' + req.body.gender + '", "' + req.body.hospital + '", "' + req.body.bloodGroup + '", "' + req.body.cause + '", "' + req.body.city + '")', (err, row) => {
        if (!err) {
            res.status(200).send('user added');
        } else {
            res.status(402).send('error');
            console.log('request blood: ', err);
        }
    });
});

app.post('/registration', (req, res) => {
    connection.query('SELECT * FROM registration_data WHERE email = "' + req.body.email + '"', (err, row) => {
        console.log(req.body.email);
        if (!err) {
            if (row.length > 0) {
                res.status(409).send('Email already exists');
                console.log(req.body);
            } else {
                bcrypt.hash(req.body.password, 10)
                    .then(hashedPassword => {
                        const query = 'INSERT INTO registration_data (name, email, password, contact, dob, gender, bloodgroup, city) VALUES ("' + req.body.name + '", "' + req.body.email + '", "' + hashedPassword + '", "' + req.body.contact + '", "' + req.body.DOB + '", "' + req.body.gender + '", "' + req.body.bloodGroup + '", "' + req.body.city + '")';

                        connection.query(query, (err, row) => {
                            if (!err) {
                                res.status(200).send('User added successfully');
                            } else {
                                res.status(400).send('Error adding user');
                                console.log('Add user error:', err);
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).send('Server error');
                        console.log('Bcrypt error:', err);
                    });
            }
        } else {
            res.status(500).send('Server error');
            console.log('Database error:', err);
        }
    });
});
app.post('/otpverification',(req,res)=>

{
    connection.query('INSERT INTO `otp`(`email`, `otp_code`) VALUES ("'+req.body.email+'","'+otp+'")',(req,result)=>
    {
         
    })
})

app.post('/logout', authenticationtoken, (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.TYPE,
        sameSite: 'Strict',
    });
    res.status(200).send("Logged out successfully");
});

app.get('/navbar', authenticationtoken, (req, res) => {
    if (req.userdata.activitystatus === true) {
        res.status(200).json({ message: 'User is active', activityStatus: true });
    } else {
        res.status(403).json({ message: 'User is inactive', activityStatus: false });
    }
});
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.EMAILPASSWORD
    }
});

app.post('/sendotp', (req, res) => {
    const otp = crypto.randomInt(100000, 1000000);

    connection.query('SELECT * FROM registration_data WHERE email="' + req.body.email + '"', (err, result) => {
        if (!err && result.length > 0) {
            connection.query('SELECT * FROM `otp` WHERE email="' + req.body.email + '"', (err, otpResult) => {  
                    if (!err && otpResult.length > 0) { 
                    connection.query('DELETE FROM `otp` WHERE email="' + req.body.email + '"', (err) => { 
                        if (!err) {
                            console.log("OTP field deleted successfully");

                            connection.query('INSERT INTO `otp` (`email`, `otp_code`) VALUES ("' + req.body.email + '", "' + otp + '")', (err) => {
                                if (err) {
                                    console.log('Database error:', err);
                                    return res.status(500).send("Failed to store OTP in the database");
                                } else {
                                    const mailOptions = {
                                        from: process.env.USEREMAIL,
                                        to: req.body.email,
                                        subject: `Hello`,
                                        text: `Hello, your OTP is: ${otp}`
                                    };

                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            console.log('Error sending OTP:', error);
                                            return res.status(500).send("Failed to send OTP email");
                                        }
                                        console.log('OTP sent:', info.response);
                                        res.status(200).send("OTP stored and email sent successfully");
                                    });
                                }
                            });
                        } else {
                            console.log("Deletion failed");
                            return res.status(500).send("Failed to delete existing OTP"); 
                        }
                    });
                } else {
                    connection.query('INSERT INTO `otp` (`email`, `otp_code`) VALUES ("' + req.body.email + '", "' + otp + '")', (err) => {
                        if (err) {
                            console.log('Database error:', err);
                            return res.status(500).send("Failed to store OTP in the database");
                        } else {
                            const mailOptions = {
                                from: process.env.USEREMAIL,
                                to: req.body.email,
                                subject: `Hello`,
                                text: `Hello, your OTP is: ${otp}`
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log('Error sending OTP:', error);
                                    return res.status(500).send("Failed to send OTP email");
                                }
                                console.log('OTP sent:', info.response);
                                res.status(200).send("OTP stored and email sent successfully");
                            });
                        }
                    });
                }
            });
        } else {
            console.log('No user registered');
            res.status(300).send('No user found');
        }
    });
});



app.get('/oldblood', authenticationtoken, (req, res) => {
    connection.query(`SELECT * FROM registration_data WHERE email="${req.userdata.email}"`, (err, results) => {
        if (!err) {
            res.status(200).json(results[0]);
        } else {
            res.status(500).send('Database error');
        }
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).send({ message: 'Logged out successfully' });
  });

app.get('/authentication',authenticationtoken,(req,res)=>
{
    if(req.userdata.activityStatus===true)
    {
        res.status(200).send("login is true")
    }else
    {
        res.status(201).send(false)
    }
})
app.post('/availabledonors',(req,res)=>
{
    connection.query('select * from registration_data where city="'+req.body.city+'"',(err,result)=>
    {
        console.log(req.body.city)

        if(!err)
        {
            res.status(200).json(result);
        }
        else
        {
            res.status(202).send("failed");
        }
    })
})
app.get('/tabledata',authenticationtoken,(req,res)=>
{
        connection.query('select * from donordata ',(err,result)=>
            {
                if(!err)
                {
                    res.status(200).json(result);
                    // console.log(userdata.email)
                }
                else
                {
                    res.status(202).send("failed");
                }
            })
    })




    app.get('/neededdata',(req,res)=>
        {
                connection.query('select * from requestblood WHERE requireddate >= CURDATE()',(err,result)=>
                    {
                        if(!err)
                        {
                            res.status(200).json(result);
                        }
                        else
                        {
                            res.status(202).send("failed");
                        }
                    })
            })
        
    app.post('/verifyotp',(req,res)=>
        {
            console.log(req.body.otp)
            connection.query('select * from otp where email="'+req.body.email+'"',(err,result)=>
            {
                // console.log(textfieldvalue);
                // console.log(dbvalue)
                if(!err)
                {
                const textfieldvalue=req.body.otp;
                const dbvalue = result[0].otp_code.toString();
                    if(textfieldvalue===dbvalue)
                    {
                        res.status(200).send("otp verified");
                    }
                    else
                    {
                        res.status(300).send("otp verification failed")
                    }
                }
                else
                {
                    res.send(401).send("otp error")
                }
            })
        })
        
        app.post('/verifyotpval',(req,res)=>
            {
                console.log(req.body.otpkey)
                connection.query('select * from otp where email="'+req.body.email+'"',(err,result)=>
                {
                    const textfieldvalue=req.body.otpkey;
                    const dbvalue = result[0].otp_code.toString();
                    console.log(textfieldvalue);
                    console.log(dbvalue)
                    if(!err)
                    {
                        if(textfieldvalue===dbvalue)
                        {
                            res.status(200).send("otp verified");
                        }
                        else
                        {
                            res.status(300).send("otp verification failed")
                        }
                    }
                    else
                    {
                        res.send(405).send("otp error")
                    }
                })
            });


            app.get('/signleuser/:id',(req,res)=>{
                connection.query('SELECT * FROM `registration_data` WHERE s_no="'+req.params.id+'"',((err,row)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.send(row)
                    }
                }))
            })
        
  
app.listen(port,() => {
    console.log('Server is running at port ' + port);
});
