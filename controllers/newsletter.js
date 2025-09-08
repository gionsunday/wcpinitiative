const Newsletter = require("../models/newsletter");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");

const currentYear = new Date().getFullYear();

const newsLetter = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const emailCheck = await Newsletter.find({email:email})
  // console.log(emailCheck);
  if(!emailCheck.length == 0){
    res.send({maessage: "EMAIL HAS BEEN REGISTERED!"})
  }
  else{
  const newsletter = await Newsletter.create(req.body);
  // console.log(newsletter)

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
        filename: "logo-bla.png",
        path: __dirname + "/logo-bla.png",
        cid: "save-logo-bla.png",
      },
    ],
     html: `
     
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Activated</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #444444;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #1c1c1c;
              color: #cccccc;
            }
            .email-container {
              background-color: #2b2b2b;
              border-color: #444444;
            }
          }
          .header {
            text-align: center;
            color: #db2777;
            font-size: 24px;
            margin-bottom: 20px;
          }
          @media (prefers-color-scheme: dark) {
            .header {
              color: #72b4ff;
            }
          }
          .button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 25px;
            font-size: 16px;
            color: #ffffff;
            background-color: #db2777;
            text-decoration: none;
            border-radius: 5px;
          }
          .button:visited{
          color:#ffffff;
          }
          .button:hover {
            background-color: #db2777;
          }
          
           @media (prefers-color-scheme: dark) {
           .button {
            color: #ffffff;
            background-color: #db2777;
            }
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
          }
          @media (prefers-color-scheme: dark) {
            .footer {
              color: #666666;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header" style="">
            <div style="width: 100%;">

    <img style="width: 100px;" src="cid:save-logo-bla.png" />
            </div>
            <div style="width: 100%;">
            
            New Subscriber
            </div>
          </div>
          // <p>From: ${name} ,</p>
          // <p>Subject: ${subject}</p>
          <p> Subscriber: ${email} </p>
          
          <p style="text-align: center;">
            <a style="color:#fff" href="https://wcpinitiative.org/" class="button">Goto Website</a>
          </p>
          <div class="footer">
            &copy; ${currentYear} Women’s Cancer Prevention Initiative . <br> All rights reserved.  
          </div>
        </div>
      </body>
      </html>
    
      
    `,
  };

  const mailOptions2 = {
    from: process.env.NEW_E,
    to: email,
    subject: `You Subscribed!`,
    attachments: [
      {
        filename: "logo-bla.png",
        path: __dirname + "/logo-bla.png",
        cid: "save-logo-bla.png",
      },
    ],
    html: `
     
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Activated</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #444444;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          @media (prefers-color-scheme: dark) {
            body {
              background-color: #1c1c1c;
              color: #cccccc;
            }
            .email-container {
              background-color: #2b2b2b;
              border-color: #444444;
            }
          }
          .header {
            text-align: center;
            color: #db2777;
            font-size: 24px;
            margin-bottom: 20px;
          }
          @media (prefers-color-scheme: dark) {
            .header {
              color: #72b4ff;
            }
          }
          .button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 25px;
            font-size: 16px;
            color: #ffffff;
            background-color: #db2777;
            text-decoration: none;
            border-radius: 5px;
          }
          .button:visited{
          color:#ffffff;
          }
          .button:hover {
            background-color: #db2777;
          }
          
           @media (prefers-color-scheme: dark) {
           .button {
            color: #ffffff;
            background-color: #db2777;
            }
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
          }
          @media (prefers-color-scheme: dark) {
            .footer {
              color: #666666;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header" style="">
            <div style="width: 100%;">

         
    <img style="width: 100px;" src="cid:save-logo-bla.png" />
            </div>
            <div style="width: 100%;"> 
           Welcome!
           </div>
           
          </div>
          <p>Hello ${name} ,</p>
          <p>Thank you for subscribing to updates from the <strong> Women’s Cancer Prevention Initiative (WCPI). </strong> We’re excited to have you as part of our growing community.</p>
           <p>By joining us, you’ll receive updates on:</p>
    <ul>
      <li>
        Cancer prevention tips and educational resources
      </li>
        <li>
     Screening programs and outreach activities
      </li>
        <li>
        Ways you can support and get involved
      </li>
    </ul>
    <p>Together, we can make early detection and prevention accessible to more women and families.</p>
    <p style="text-align: center;">
      <a style="color:#fff" href="https://wcpinitiative.org/" class="button">Goto Website</a>
    </p>
    <p>Please contact us directly at <a href="mailto:info@wcpinitiative.org"
        style="color: #0056b3;">info@wcpinitiative.org</a>.</p>
    <div class="footer">
      &copy; ${currentYear} Women’s Cancer Prevention Initiative . <br> All rights reserved.
    </div>
        </div>
      </body>
      </html>
    
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
