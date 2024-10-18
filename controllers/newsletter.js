const NewLetter = require("../models/newsletter");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");

const newsLetter = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const emailCheck = await NewLetter.find({email:email})
  console.log(emailCheck);
  if(emailCheck){
    res.send({maessage: "EMAIL HAS BEEN REGISTERED!"})
  }
  else{
  const newsletter = await NewLetter.create({ ...req.body });

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
    subject: `New Subscriber`,
    attachments: [
      {
        filename: "logo-blue.png",
        path: __dirname + "/logo-blue.png",
        cid: "save-logo-blue.png",
      },
    ],
    html: `
     <body style="background-color: rgba(253, 222, 232, 0.048); width: 100%;" >

    <div  style="  height: 100%; padding: .5em .5em 4em .5em; border-radius:10px;
    margin-top: 70px !important;
    background-color: #d63384; width: 100%; margin: auto; position: relative; text-align:left; 
    font-size: 1.5em; word-wrap: break-word;">

    <div style="text-align:center; ">
    <img style="width: 150px;" src="cid:save-logo-blue.png" />
    </div>
        <h4 style="text-align: center; color: rgb(255, 255, 255); font-size: 2em;  ">New Newsletter Subscriber</h4>
        <p style="
             border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
             margin: auto; margin-bottom: 4px; background-color: white;">Email :
            <span style="color: rgb(55, 33, 248); font-weight: 900;" >${email}</span> </p>
      
    </div>
</body>
      
    `,
  };

  const mailOptions2 = {
    from: process.env.NEW_E,
    to: email,
    subject: `You Subscribed!`,
    attachments: [
      {
        filename: "logo-blue.png",
        path: __dirname + "/logo-blue.png",
        cid: "save-logo-blue.png",
      },
    ],
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
             margin: auto; margin-bottom: 4px; background-color: white;">Hi!
            <span style="color: rgb(55, 33, 248); font-weight: 900;" >
            </span> 
            <br>
            You have successfully subscribed to our weekly newsletter.
            <br>
            Stay tuned as we bring you stunning updates on our events.
            <br>
            <br>

            Thank you for yor support. 
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
      message: "Email Sent!",
    });
  });
}
};

module.exports = { newsLetter };
