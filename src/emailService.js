const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

let transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendMail(to, subject, text) {
  transporter
    .sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text,
    })
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}

module.exports = {
  sendMail,
};
