import pkg from 'mongoose';
const { isValidObjectId } = pkg;
import Users from '../models/dbUsers.js';
import { sendError } from '../utils/helper.js';
import { generateEmailTemplate } from '../utils/mailVer.js';
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { appendFile } from 'fs';

dotenv.config('../../.env');
// API Logic
// FIXME:
// Implement a expiration for non verified users
export const createUser = async (req, res) => {
  const { name, email, password, states } = req.body;

  Users.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(500).json({ message: 'already an existing user' });
    } else {
      const user = new Users({ 
        name, 
        email, 
        password, 
        states,
        emailToken: crypto.randomBytes(64).toString('hex'),
      });

      // Email verification
      sgMail.setApiKey(process.env.API_KEY);

      const message = {
        to: email,
        from: {
          email: 'travelknightsnoreply@gmail.com',
          name: 'TravelKnights',
        },
        subject: 'Email Verification',
        text: `
        Hello, thanks for registering on our site.
        Click below to verify your email!
        https://${req.headers.host}/api/verifyEmail?token=${user.token}
        `,
        html:`
        <h1>Hello,</h1>
        <p>Thanks for registering on our site.</p>
        <p>Please click the link below to verify your account.</p>
        <a herf="https://${req.headers.host}/api/verifyEmail?token=${user.token}">Verify your account</a>
        `
      };
      
      try{
        sgMail.send(message);
        res.status(500).json({ message: 'Success! Thanks for registering. Please check your email to verify your account.' });
      } catch(error) {
        res.status(500).json(error);
      }

      // Save user in mongodb
      user.save();
    }
  });
};

//function to login user
export const getUser = async (req, res) => {
  const { email, password, emailVerified } = req.body;
  Users.findOne({ email: email }, (err, user) => {

    if (user) {
      if (user.emailVerified) {
        bcrypt.compare(password, user.password, function (error, isMatch) {
          if (error) {
            throw error;
          } else if (!isMatch) {
            res.status(401).send({ message: '*Password is Incorrect*' });
          } else {
            res.status(202).send({ user: user });
          }
        });
      } else {
        res.status(403).send({ message: '*Email is not Verified*' });
      }
    } else {
      res.status(405).send({ message: '*User is not registered*' });
    }
  });
};

// This function verifies that the user has inputted
// the correct token and CAN send a confirmation email
export const verifyEmail = async (req, res) => {
  try{
    const user = await Users.findOne({emailToken: req.query.token});
    if(!user){
      res.status(405).send({ message: '*Token is invalid*' });
      return res.redirect('/');
    }
    else {
      user.emailToken = null;
      user.emailVerified = true;
      user.createdAt = null;
      await user.save();
      await req.getUser(user, async (err) => {
        if (err) return next(err);
        req.send('success', `Welcome to TravelKnights ${user.name}`);
        const redirectUrl = req.session.redirectTo || '/Verified';
        delete req.session.redirect;
        res.redirect(redirectUrl);
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect('/'); 
  }
};

// Function to add memory to a user's state's array of object
export const addMemory = async (req, res) => {
  // recieve stateAbbreviation, city, date, description, image
  const { userId, stateAbbreviation, city, date, description, image } =
    req.body;

  const user = await Users.findById(userId);

  // initialize a non-existing state
  let stateIndex = -1;

  // Look for state in states array
  for (let i = 0; i < user.states.length; i++) {
    if (user.states[i].stateAbbreviation == stateAbbreviation) {
      stateIndex = i;
      break;
    }
  }

  // State was not found, create a new state object
  if (stateIndex == -1) {
    // Declare and initialize a new state object
    const newState = {
      stateAbbreviation: String,
      cities: [],
    };

    // Assign state abbreviation
    newState.stateAbbreviation = stateAbbreviation;

    // Declare and initialize a new city object
    const newCity = {
      city: String,
      memories: [],
    };

    // Assign city name
    newCity.city = city;

    // Declare and initialize a new memory for the city
    const newMemory = { date: String, description: String, img: String };
    newMemory.date = date;
    newMemory.description = description;
    newMemory.img = image;

    // Add memory to the states array
    newCity.memories.push(newMemory);
    newState.cities.push(newCity);
    user.states.push(newState);
  }

  // If state already exists
  // Add new city or add to pre-existing city
  else {
    let cityIndex = -1;
    // Look for city in city array
    for (let i = 0; i < user.states[stateIndex].cities.length; i++) {
      if (user.states[stateIndex].cities[i].city == city) {
        cityIndex = i;
        break;
      }
    }

    // City was not found, create new city object
    if (cityIndex == -1) {
      const newCity = {
        city: String,
        memories: [],
      };

      // Assign city name
      newCity.city = city;

      const newMemory = { date: String, description: String, img: String };
      newMemory.date = date;
      newMemory.description = description;
      newMemory.img = image;

      // Add memory to the states array
      newCity.memories.push(newMemory);
      user.states[stateIndex].cities.push(newCity);
    }

    // City exists, add memory to the existing city
    else {
      const newMemory = { date: String, description: String, img: String };
      newMemory.date = date;
      newMemory.description = description;
      newMemory.img = image;
      user.states[stateIndex].cities[cityIndex].memories.push(newMemory);
    }
  }

  // Save user info to MongoDB
  user.save((err) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(user);
    }
  });
};

//function to update an existing memory
export const updateMemory = async (req, res) => {
  //receieve memory ObjectID, state index, city index, memory index, date, description, and image
  const { userId, stateIdx, cityIdx, memoryIdx, date, description, image } = req.body;

  //create user const var
  const user = await Users.findById(userId);

  //create and populate updated memory
  const editedMemory = user.states[stateIdx].cities[cityIdx].memories[memoryIdx];
  editedMemory.date = date;
  editedMemory.description = description;
  editedMemory.img = image;

  //update old memory with updated memory
  user.states[stateIdx].cities[cityIdx].memories[memoryIdx] = editedMemory;
  
  // Save user info to MongoDB
  user.save((err) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(user);
    }
  });
}

//function to delete an existing memory
export const deleteMemory = async (req, res) => {
  //receieve memory ObjectID, state index, city index, memory index
  const { userId, stateIdx, cityIdx, memoryIdx } = req.body;

  //create user const var
  const user = await Users.findById(userId);

  //delete the memory at the recieved memory index
  user.states[stateIdx].cities[cityIdx].memories.splice(memoryIdx, 1);

  //if memories is empty, splice city and recieved city index
  if(user.states[stateIdx].cities[cityIdx].memories.length == 0)
  {
    user.states[stateIdx].cities.splice(cityIdx, 1);
  }
  
  //if cities is empty, splice state and recieved state index
  if(user.states[stateIdx].cities.length == 0)
  {
    user.states.splice(stateIdx, 1);
  }

  // Save user info to MongoDB
  user.save((err) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(user);
    }
  }); 
}

