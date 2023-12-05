import { response } from 'express';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
})

const SendMail = (email, name, token) => {
  const verifyLink = `${process.env.CLIENT_URL}verify-user?token=${token}`;

  transport.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Welcome to E-commerce store",
    html: `<b>Welcome ${name} </b>
        <p>You have successfully signed up to our E-commerce store.</p>
        <p>Click the following link to verify your:</p><p><a href='${verifyLink}'>Verify</a></p>
        <p>Happy Shopping !</p>`
  }, (err, res) => {

    if (err) {
      res.send('Welcome email error', err)
    } else {
      res.send('Successful', res.response);
    }
  })
};

const SendResetToken = (email, token) => {
  const resetLink = `${process.env.CLIENT_URL}reset-password?token=${token}`;

  try {
    transport.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Reset password link",
      html: `<p>Click the following link to reset your password:</p><p><a href='${resetLink}'>Reset Password</a></p>`
    })
  } catch (err) {
    response.send('Failed: ', err)
  }
};

export {
  SendMail,
  SendResetToken,
};
