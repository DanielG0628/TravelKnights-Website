import Users from '../models/dbUsers.js';
import VerificationToken from '../models/verificationToken.js';
import { generateOTP } from '../utils/mailVer.js';
import { mailVerification } from '../utils/mailVer.js';
import { generateEmailTemplate } from '../utils/mailVer.js';


// API Logic
export const createUser = async (req, res) => {
  const {name, email, password, phone, states} = req.body;
   Users.findOne({email:email}, (err,user) => {
      if(user){
        res.status(500).json({message:"already an existing user"});
      }else {
        const user = new Users({name, email, password, phone, states});
        const OTP = generateOTP();
        const verificationToken = new VerificationToken({
          owner: user._id,
          token: OTP
        });
        verificationToken.save();
        mailVerification().sendMail({
          from: 'verifyEmail@email.com',
          to: user.email,
          subject: "Verify your email account",
          html: generateEmailTemplate(OTP),
        });
        
        user.save(err=>{
          if(err){
            res.status(501).send(err);
          }
          else{
            res.status(201).send(user);
          }
        })
      }
  })
};

export const getUser = async (req, res) => {
  const {email, password} = req.body;
  Users.findOne({email:email}, (err,user) =>{
    if(user){
      if(password == user.password){
        res.status(202).send({message:"login successful", user: user});
      }else{
        res.status(401).send({message:"wrong credentials"});
      }
    }else{
      res.status(404).send({message:"not registered"});
    }
  })
};
