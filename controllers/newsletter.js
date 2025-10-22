const Newsletter = require("../models/newsletter");
require("dotenv").config();
const { Resend } = require("resend");
const { StatusCodes } = require("http-status-codes");

const resend = new Resend(process.env.RESEND_API_KEY);

const currentYear = new Date().getFullYear();

const newsLetter = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "EMAIL HAS BEEN REGISTERED!" });
    }

    // Save new subscriber
    await Newsletter.create(req.body);

    // Define HTMLs (unchanged)
    const adminHtml = `...`; // your first HTML template
    const userHtml = `...`;  // your second HTML template

    // send both emails concurrently via Resend
    const [adminMail, userMail] = await Promise.all([
      resend.emails.send({
        from: "Women’s Cancer Prevention Initiative <info@wcpinitiative.org>",
        to: process.env.NEW_E,
        subject: "New Subscriber",
        html: `
        <html lang="en">
          <head> ... </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div><img style="width: 100px;" src="https://wcpinitiative.org/img/icons/logo.png" /></div>
                <div>New Subscriber</div>
              </div>
              <p>Subscriber: ${email}</p>
              <p style="text-align: center;">
                <a href="https://wcpinitiative.org/" class="button" style="color:#fff;background:#db2777;padding:12px 25px;text-decoration:none;border-radius:5px;">Goto Website</a>
              </p>
              <div class="footer">
                &copy; ${currentYear} Women’s Cancer Prevention Initiative. <br> All rights reserved.
              </div>
            </div>
          </body>
        </html>
        `
      }),
      resend.emails.send({
        from: "Women’s Cancer Prevention Initiative <info@wcpinitiative.org>",
        to: email,
        subject: "You Subscribed!",
        html: `
        <html lang="en">
          <head> ... </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div><img style="width: 100px;" src="https://wcpinitiative.org/img/icons/logo.png" /></div>
                <div>Welcome!</div>
              </div>
              <p>Hello ${name},</p>
              <p>Thank you for subscribing to updates from the <strong>Women’s Cancer Prevention Initiative (WCPI)</strong>.</p>
              <p>By joining us, you’ll receive updates on:</p>
              <ul>
               <b><li>Cancer prevention tips and educational resources</li></b> 
               <b> <li>Screening programs and outreach activities</li></b>
               <b><li>Ways you can support and get involved</li></b>
                
              </ul>
              <p>Together, we can make early detection and prevention accessible to more women and families.</p>
              <br/>
              <p style="text-align: center;">
                <a href="https://wcpinitiative.org/" class="button" style="color:#fff;background:#db2777;padding:12px 25px;text-decoration:none;border-radius:5px;">Goto Website</a>
              </p>
              <br/>
              <p>Please contact us directly at <a href="mailto:info@wcpinitiative.org" style="color:#0056b3;">info@wcpinitiative.org</a>.</p>
              <div class="footer">
                &copy; ${currentYear} Women’s Cancer Prevention Initiative. <br> All rights reserved.
              </div>
            </div>
          </body>
        </html>
        `
      })
    ]);

    // Response
    res.json({
      message: "Email Sent via Resend!",
      adminStatus: adminMail.data?.id ? "Delivered" : "Failed",
      userStatus: userMail.data?.id ? "Delivered" : "Failed"
    });

  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Something went wrong"
    });
  }
};

module.exports = { newsLetter };
