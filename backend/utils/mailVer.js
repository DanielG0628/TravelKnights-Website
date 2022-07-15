const generateOTP = () => {
    let otp = '';
  for(let i = 0; i <= 4; i++){
    const randomVal = Math.round(Math.random() * 9 )
    otp = otp + randomVal;
  }
  return otp;
}

export default generateOTP;