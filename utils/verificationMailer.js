const nodemailer = require('nodemailer');
const debug = require('debug')('SignIn-SignUp:confirmationEmail');

const config = require('../bin/config/config');

module.exports = (email, jwt, username) => {
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

  // ********************************************************************************
  // Html mail data

  const htmlMail = `
  <html style="padding:0; margin:0">
  <body style="padding:0; margin:0">
  <div style="padding: 20px 0 50px; font-family: Lucida Sans Unicode, Lucida Grande, sans-serif;padding-bottom: 40px">
    <div style="position: relative; margin: auto; top: 0px; left: 0; z-index: 200; right: 0; color: #666;border-radius: 3px; background: #E8EAEB; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); overflow: auto; max-width: 700px">
    <div style="background: #009688; position: relative; height: 130px; width: 100%; margin-bottom: 30px;">
      <div style="width: 100%; height: 100px; position: relative;">
        <h1 style="margin: 0px auto; font-size: 7vmin; font-weight: 300; color: #cfd8dc; line-height: 100px; text-align: center; font-family: Comic Sans MS, cursive, sans-serif"><strong>${config.sender}</strong></h1>
      </div>
      <div style="position: relative; background: #00796b; height: 40px;"><h1 style="margin-left: 20px; margin-top: 0; font-size: 3.5vmin; font-weight: 300; color: #cfd8dc; line-height: 40px;">Confirmation</h1></div>
    </div>
    <div style="width: 80%; margin: auto;margin-bottom: 20px;font-size: 14px;text-align: center;">
      <p style="font-size: 17px; margin: 15px 0 35px">Hey <strong>${username}</strong>, you're almost ready to start enjoying ${config.sender}. Simply click the big Green Button below to verify your Account :)</p>
      <a href="${config.host}/auth/confirmation/${jwt}" style= "border: 0; text-align: center;background: #009688;color: #eee;padding: 10px;font-size: 16px;font-weight: 300;max-width: 200px;margin: 20px auto;display: block;cursor: pointer;border-radius: 2px;box-shadow: 0px 5px 6px rgba(0,0,0,0.3);text-decoration: none;">Confirm Account</a>
      <p style="font-size: 13px; margin: 0 0 75px"><strong>If not verified under 1 Hour (of first email) the Email Id will be un-registered</strong></p><br>
      <p style="font-size: 12px;"><i>**If you didn't register with us feel free to ignore this mail</i></p>

    </div>
    <div style="width: 100%;height: 50px;background: #00695c;position: absolute;bottom: 0;margin:0;">
      <p style="color: #cfd8dc;font-size: 14px;text-align: center; margin:0; line-height: 50px">Not a member?<span style="color: white;cursor: pointer;"><a href="${config.host}/auth/register" style="text-decoration: none;color: inherit;"> Sign up now </a></span></p>
      </div>
    </div>
    <div style="color: #aaa;font-size: 14px;text-align: center; padding-top: 15px;">
      <p style="margin:3px; color: #999">In case the button don't work go to :</p>
      <a href="${config.host}/auth/confirmation/${jwt}" style="text-decoration: none;color: inherit;font-size: 10px;">${config.host}/auth/confirmation/${jwt}</a>
    </div>
  </div>
  </body></html>
  `;
  // ${config.host}/auth/register
  // ${config.host}/auth/confirmation/${jwt}

  // text mail data
  const textMail = `
  Hey, ${username}
  Go to ${config.host}/auth/confirmation/${jwt} to verify your Account with ${config.sender} under 1 hour of first Issue of mail.
  `;

  // **********************************************************************************

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"${config.sender}" <${config.yahooUser}>`, // sender address
    to: email, // list of receivers
    subject: 'Email Confirmation', // Subject line
    text: textMail, // plain text body
    html: htmlMail, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return debug(error);
    }
    debug('Message sent: %s', info.messageId);
  });
};
