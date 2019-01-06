const nodemailer = require('nodemailer');
const debug = require('debug')('SignIn-SignUp:confirmationEmail');

const config = require('../bin/config/config');

module.exports = (email, jwt) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Yahoo',
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.yahooUser, // generated ethereal user
      pass: config.yahooPass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"${config.sender}" <${config.yahooUser}>`, // sender address
    to: email, // list of receivers
    subject: 'Email Confirmation', // Subject line
    text: 'Hello world?', // plain text body
    html: `
    <a href="${config.host}/users/confirmation/${jwt}">Verify<a>
    `, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return debug(error);
    }
    debug('Message sent: %s', info.messageId);
  });
};
