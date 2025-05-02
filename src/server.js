require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'veveethank@gmail.com',
    pass: 'aqkriovqusmxoiqz'
  },
});
app.get("/" , (req , res)=>{
    res.send("Hello world")
})

app.post('/api/send-email', async (req, res) => {
    console.log("I am IN")
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.RECEIVING_EMAIL, // The email address where you'll receive messages
    subject: `New Contact Form Submission from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
