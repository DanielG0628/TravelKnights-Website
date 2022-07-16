import nodemailer from 'nodemailer';

export const generateOTP = () => {
    let otp = '';
  for(let i = 0; i <= 4; i++){
    const randomVal = Math.round(Math.random() * 9 )
    otp = otp + randomVal;
  }
  return otp;
}

export const mailVerification = () => {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD
    } 
  });

  return transport;
}

export const generateEmailTemplate = (code) => {
  return code
}