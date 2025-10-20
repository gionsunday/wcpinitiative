const Contact = require("../models/contact");
require("dotenv").config();
const { Resend } = require("resend");
const { StatusCodes } = require("http-status-codes");

const currentYear = new Date().getFullYear();

const contact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const formattedMessage = message
    .split(/\n+/) // splits message by line breaks
    .map(para => `<p>${para.trim()}</p>`) // wrap each in <p>
    .join("");
  try {
    // Save contact form to DB
    await Contact.create({ ...req.body });

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // First email — Admin notification
    const mailOptions1 = {
      from: "WCPI <noreply@wcpinitiative.org>",
      to: process.env.NEW_E,
      subject: `New message from ${name}`,
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
            <div class="header">
              <div style="width: 100%;">
                <img style="width: 100px;" src="https://wcpinitiative.org/img/icons/logo.png" />
              </div>
              <div style="width: 100%;">New message</div>
            </div>
            <p>From: ${name}</p>
            <a href="mailto:${email}" <p>Email address: ${email}</p></a>
            <p>Subject: ${subject}</p>
            <p>${formattedMessage}</p>
            <p style="text-align: center;">
              <a style="color:#fff" href="https://wcpinitiative.org/" class="button">Goto Website</a>
            </p>
            <div class="footer">
              &copy; ${currentYear} Women’s Cancer Prevention Initiative. <br> All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Second email — Auto-reply to sender
    const mailOptions2 = {
      from: process.env.NEW_E,
      to: email,
      subject: `Your Message ${name}`,
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
            <div class="header">
              <div style="width: 100%;">
                <img style="width: 100px;" src="https://wcpinitiative.org/img/icons/logo.png" />
              </div>
              <div style="width: 100%;">Message Received!</div>
            </div>
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to the <strong>Women’s Cancer Prevention Initiative (WCPI).</strong> Your message has been received, and a member of our team will respond to you shortly.</p>
            <p>At WCPI, we are committed to <strong>promoting early detection, education, and support</strong> in the fight against breast and cervical cancer. Your interest and engagement mean a lot to us, and together, we can make a difference.</p>
            <p style="text-align: center;">
              <a style="color:#fff" href="https://wcpinitiative.org/" class="button">Goto Website</a>
            </p>
            <p>If your inquiry is urgent, please contact us directly at <a href="mailto:info@wcpinitiative.org" style="color: #0056b3;">info@wcpinitiative.org</a>.</p>
            <div class="footer">
              &copy; ${currentYear} Women’s Cancer Prevention Initiative. <br> All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails concurrently
    await Promise.all([
      resend.emails.send(mailOptions1),
      resend.emails.send(mailOptions2),
    ]);

    res.status(StatusCodes.OK).json({ message: "Email Sent!" });

  } catch (error) {
    console.error("Resend Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Failed to send email",
    });
  }
};

module.exports = { contact };
