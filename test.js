const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'strucureo@gmail.com',
    pass: 'knjb uqwd bhes qxse',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailOptions = {
  from: '"Test Sender" <strucureo@gmail.com>',
  to: 'aathishpirate@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});