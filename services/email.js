const nodemailer = require('nodemailer');
let transporter;
const senderEmail = process.env.EMAIL_SENDER_ACCOUNT;
const passEmail = process.env.PASS_SENDER_ACCOUNT;

const initializeTransporter = async () => {
  if(transporter) {
    return;
  }
  if(!senderEmail){
    throw new Error('No senderEmail detected! Please verify if the parameter EMAIL_SENDER_ACCOUNT on .env file is correctly configured');
  }
  if(!passEmail){
    throw new Error('No passEmail detected! Please verify if the parameter PASS_SENDER_ACCOUNT on .env file is correctly configured');
  }
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: passEmail
    }
  });
};

const send = async (report, email) => {
  await initializeTransporter();
  const mailOptions = {
    from: 'Raphael analysys',
    to: email,
    subject: 'REPORT',
    text: report
  };
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
};


module.exports = {
  send
};

