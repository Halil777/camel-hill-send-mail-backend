const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 7727;

app.use(cors());

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sendtomail777999@gmail.com",
    pass: "knsdtrlcatfppakf",
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).send("Incomplete data provided");
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "microsoft7779@gmail.com",
      subject: "New Contact Form Submission",
      text: `
        Full Name: ${fullName}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);

    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
