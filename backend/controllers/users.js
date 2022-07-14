import Users from '../models/dbUsers.js';

// API Logic
export const createUser = async (req, res) => {
  const {name, email, password, phone, secretanswer} = req.body;
  Users.findOne({email:email}, (err,user) => {
      if(user){
        res.status(500).json({message:"already an existing user"});
      }else {
        const user = new Users({name, email, password, phone, secretanswer});
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
