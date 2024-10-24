const Appointment = require("../models/appointment");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");

const appointment = async (req, res) => {
    const {name, email, phone, topic, theDate, theTime, message} = req.body
    console.log(req.body)
  const appointment = await Appointment.create({...req.body });
 

  var transporter = nodemailer.createTransport({
    service: process.env.E_NEWSERVER,
    // port: 587,
    // secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.NEW_E,
      pass: process.env.NEW_P,
    },
  });
  const mailOptions1 = {
    from: process.env.NEW_E,
    to: process.env.NEW_E,
    subject: `New Appointment from ${name}` ,
    attachments: [{
        filename: 'logo-blue.png',
        path: __dirname + '/logo-blue.png',
        cid: 'save-logo-blue.png'
      }],
    html: `
     <body style="background-color: rgba(253, 222, 232, 0.048); width: 100%;" >

    <div  style="  height: 100%; padding: .5em .5em 4em .5em; border-radius:10px;
    margin-top: 70px !important;
    background-color: #d63384; width: 100%; margin: auto; position: relative; text-align:left; 
    font-size: 1.5em; word-wrap: break-word;">

    <div style="text-align:center; ">
    <img style="width: 150px;" src="cid:save-logo-blue.png" />
    </div>
        <h4 style="text-align: center; color: rgb(255, 255, 255); font-size: 2em;  ">New Message</h4>
        <p style="
             border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
             margin: auto; margin-bottom: 4px; background-color: white;">Sender's Name:
            <span style="color: rgb(55, 33, 248); font-weight: 900;" >${name}</span> </p>
        <p  style=" margin-bottom: 4px !important;
        border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
        margin: auto; background-color: white;">Sender's Email: <span>${email}</span>
        </p>
         <p  style=" margin-bottom: 4px !important;
        border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
        margin: auto; background-color: white;">Sender's Phone: <span>${phone}</span>
        </p>
         <p  style=" margin-bottom: 4px !important;
        border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
        margin: auto; background-color: white;">Preferred Date: <span>${theDate}</span>
         <p  style=" margin-bottom: 4px !important;
        border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
        margin: auto; background-color: white;">Preferred Time: <span>${theTime}</span>
        </p>
        </p>
         <p  style=" margin-bottom: 4px !important;
        border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
        margin: auto; background-color: white;">Sender's Topic: <span>${topic}</span>
        </p>
        <p  style=" margin-bottom: 4 !important;
         border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
         margin: auto; background-color: white;"> Message: <span style=" color: rgba(128, 128, 128, 0.678);">
        ${message}
         </span> 
        </p>
    </div>
</body>
      
    `,
  };

  const mailOptions2 = {
    from: process.env.NEW_E,
    to: email,
    subject: `Your Message ${name}` ,
    attachments: [{
        filename: 'logo-blue.png',
        path: __dirname + '/logo-blue.png',
        cid: 'save-logo-blue.png'
      }],
    html: `
     <body style="background-color: rgba(253, 222, 232, 0.048); width: 100%;" >

    <div  style="  height: 100%; padding: .5em .5em 4em .5em; border-radius:10px;
    margin-top: 70px !important;
    background-color: #d63384; width: 100%; margin: auto; position: relative; text-align:left; 
    font-size: 1.5em; word-wrap: break-word;">

    <div style="text-align:center; ">
    <img style="width: 150px;" src="cid:save-logo-blue.png" />
    </div>
        <h4 style="text-align: center; color: rgb(255, 255, 255); font-size: 2em;  ">Message Recieved</h4>
        <p style="
             border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
             margin: auto; margin-bottom: 4px; background-color: white;">Hi,
            <span style="color: rgb(55, 33, 248); font-weight: 900;" > ${name}!
            </span> 
            <br>
            This is to notify you that your message was recieved by us. <br>
            You will hear from us soon. <br>
            Thank you for your feedback. 
            <br>
            <br>

            -Admin
            WCPInitiative. 
            </p>
     
    </div>
</body>
      
    `,
  };

   transporter.sendMail(mailOptions1, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
  });

  transporter.sendMail(mailOptions2, function (error, body) {
    if (error) {
      return res.json({ error: error });
    }
    // res.send({contact})
    res.json({
      message: "Email Sent!"
        
    });
  });
};

module.exports = { appointment };
