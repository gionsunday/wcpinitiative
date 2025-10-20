require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const test = async (req, res) =>{
    console.log(req.body)
    const {email} = req.body

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzBlN2IyZjdiNDQ2ZWU1MjhiM2YyMDMiLCJuYW1lIjoiU3VuZGF5IEpvaG4iLCJpYXQiOjE3MzE5NjgyNTIsImV4cCI6MTczNDU2MDI1Mn0.OswkHTBmh2a21METwqcNXjTrIUb7sed-3nE91LgW0Pc"
     try {
        const data = jwt.verify(token, "cobratatejwtsecret")
        console.log(data)
     } catch (error) {
        console.log(error)
     }
    
    
    // const transporter = nodemailer.createTransport({
    //     host: 'mail.wcpinitiative.org', // SMTP host from cPanel
    //     port: 465, // Use 587 for TLS or 465 for SSL
    //     secure: true, // true for SSL, false for TLS
    //     auth: {
    //         user: 'info@wcpinitiative.org', // Your email address
    //         pass: '@WCPInitiative100%', // Your email password
    //     },
    //     dsn: {
    //         id: '123456', // Unique message ID
    //         return: 'headers', // Ask for headers in case of failure
    //         notify: ['failure', 'delay'], // Notify on failure or delay
    //         recipient: 'info@wcpinitiative.org', // Where to send DSN notifications
    //     },
    //     logger: true, // Log messages to the console
    // debug: true,  // Output debugging info
    // });
    // const mailOptions1= {
    //     from: "info@wcpinitiative.org",
    //     to: email,
    //     subject: `Your Message ` ,
      
    //     html: `
    //      <body style="background-color: rgba(253, 222, 232, 0.048); width: 100%;" >
    
    //     <div  style="  height: 100%; padding: .5em .5em 4em .5em; border-radius:10px;
    //     margin-top: 70px !important;
    //     background-color: #d63384; width: 100%; margin: auto; position: relative; text-align:left; 
    //     font-size: 1.5em; word-wrap: break-word;">
    
    //     <div style="text-align:center; ">
    //     <img style="width: 150px;" src="cid:save-logo-blue.png" />
    //     </div>
    //         <h4 style="text-align: center; color: rgb(255, 255, 255); font-size: 2em;  ">Message Recieved</h4>
    //         <p style="
    //              border-radius: 10px; padding: 10px;  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.123); width: 90%; 
    //              margin: auto; margin-bottom: 4px; background-color: white;">Hi,
    //             <span style="color: rgb(55, 33, 248); font-weight: 900;" >!
    //             </span> 
    //             <br>
    //             This is to notify you that your message was recieved by us. <br>
    //             You will hear from us soon. <br>
    //             Thank you for your feedback. 
    //             <br>
    //             <br>
    
    //             -Admin
    //             WCPInitiative. 
    //             </p>
         
    //     </div>
    // </body>
          
    //     `,
    //   };

    //   const mailOptions = {
    //     from: 'info@wcpinitiative.org', // Sender address
    //     to: "richardadaji@gmail.com", // List of recipients
    //     subject: 'Test Email', // Subject line
    //     text: 'Hello! This is a test email.', // Plain text body
    //     html: '<b>Hello!</b> This is a test email.', // HTML body
    // };
    
   
    
      //try {
        // transporter.verify(function (error, success) {
        //     if (error) {
        //         console.log('Error:', error);
        //     } else {
        //         console.log('Server is ready to take messages:', success);
        //     }
        // });

    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             return console.log('Error:', error);
    //         }
    //         console.log('Message sent:', info);
    //     });
    //   } catch (error) {
    //     console.log(error)
    //   }

}

module.exports = {test}