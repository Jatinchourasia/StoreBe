const nodemailer = require("nodemailer");

const mailHelper = async (option) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const message = {
    from: '"VogueVilla" <info@VogueVilla.com>', // sender address
    to: option.email, // list of receivers
    subject: option.subject, // Subject line
    text: option.message, // plain text body
    html: "<b>VogueVilla</b>", // html body
  };
  let info = await transporter.sendMail(message);
};

module.exports = mailHelper;
