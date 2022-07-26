import pkg from 'mongoose';
const { isValidObjectId } = pkg;
import Users from '../models/dbUsers.js';
import VerificationToken from '../models/verificationToken.js';
import { sendError } from '../utils/helper.js';
import { generateOTP } from '../utils/mailVer.js';
import { mailVerification } from '../utils/mailVer.js';
import { generateEmailTemplate } from '../utils/mailVer.js';
import bcrypt from 'bcrypt';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config('../../.env');
// API Logic
// FIXME:
// Implement a expiration for non verified users
export const createUser = async (req, res) => {
  const { name, email, password, states, emailVerified } = req.body;

  Users.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(500).json({ message: 'already an existing user' });
    } else {
      const user = new Users({ name, email, password, states, emailVerified });
      const OTP = generateOTP();
      const verificationToken = new VerificationToken({
        owner: user._id,
        token: OTP,
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
        text: 'Test',
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: inherit;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
    <style>
      @media screen and (max-width:480px) {
        table\0 {
          width: 480px !important;
          }
      }
    </style>
      <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet"><style>
body {font-family: 'Muli', sans-serif;}
</style><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 20px 30px 20px;" bgcolor="#F8F4E3" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="540" style="width:540px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d8508015-a2cb-488c-9877-d46adf313282">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:14% !important; width:14%; height:auto !important;" width="76" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/50296950f3d0181f/b872becf-a6de-43b4-9e58-06f047509986/4000x4000.png">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="331cde94-eb45-45dc-8852-b7dbeb9101d7">
    <tbody>
      <tr>
        <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="948e3f3f-5214-4721-a90e-625a47b1c957" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:50px 30px 18px 30px; line-height:35px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 28px">Thanks for signing up with TravelKnights!</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a10dcb57-ad22-4f4d-b765-1d427dfddb4e" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Please verify your email address</span></div>
<div style="font-family: inherit; text-align: center"><span style="font-size: 18px; color: #65743a"><strong>Thank you!</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d050540f-4672-4f31-80d9-b395dc08abe1">
      <tbody>
        <tr>
          <td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 0px 0px; background-color:#ffffff;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#65743A" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                  <a href="https://travelknights.herokuapp.com/Verified" style="background-color:#65743A; border:1px solid #F8F4E3; border-color:#F8F4E3; border-radius:0px; border-width:1px; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit; color:#F8F4E3;" target="_blank">Verify Email Now</a>
                </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d.1">
    <tbody>
      <tr>
        <td style="padding:0px 0px 50px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`,
      };

      sgMail
        .send(message)
        .then((response) => console.log('Email sent!'))
        .catch((error) => console.log(error.message));

      // Save user in mongodb
      user.save((err) => {
        if (err) {
          res.status(501).send(err);
        } else {
          res.status(201).send(user);
        }
      });
    }
  });
};

// FIXME:
// Implement if user is not verified, they cannot log in
export const getUser = async (req, res) => {
  const { email, password, emailVerified } = req.body;
  //console.log(emailVerified);
  Users.findOne({ email: email }, (err, user) => {
    //const correctpass = await bcrypt.compare(password, user.password);
    //console.log(password);

    if (user) {
      if (user.emailVerified) {
        //console.log('Email Verified');
        bcrypt.compare(password, user.password, function (error, isMatch) {
          if (error) {
            throw error;
          } else if (!isMatch) {
            if (user.password == password) {
              res.status(202).send({ user: user });
            } else {
              console.log(password + '        ' + user.password);
              console.log("Password doesn't match!");
              res.status(401).send({ message: '*Password is Incorrect*' });
            }
          } else {
            //console.log(password + '        ' + user.password);
            //console.log('Password matches!');
            //local storeage send json
            //return res.json(user);
            res.status(202).send({ user: user });
          }
        });
      } else {
        //console.log('Email not Verified');
        res.status(403).send({ message: '*Email is not Verified*' });
      }
    } else {
      res.status(405).send({ message: '*User is not registered*' });
    }
  });
};

/*
export const googcreateUser = async (req, res) => {
  const { name, email, password, states } = req.body;

  Users.findOne({ email: email }, (err, user) => {
    if (user) {
      res.status(500).json({ message: "already an existing user" });
    } else {
      const user = new Users({ name, email, password, states });
      const OTP = generateOTP();
      const verificationToken = new VerificationToken({
        owner: user._id,
        token: OTP,
      });

      verificationToken.save();*/
/*
      mailVerification().sendMail({
        from: 'verifyEmail@email.com',
        to: user.email,
        subject: 'Verify your email account',
        html: generateEmailTemplate(OTP),
      });
*/
/*
      user.save((err) => {
        if (err) {
          res.status(501).send(err);
        } else {
          res.status(201).send(user);
        }
      });
    }
  });
};

// FIXME:
// Implement if user is not verified, they cannot log in
export const googgetUser = async (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email: email }, (err, user) => {
    //const correctpass = await bcrypt.compare(password, user.password);
    //console.log(password);
    //console.log(user.password);
    if (user) {
      if (user.emailVerified) {
        console.log("Email Verified");
        bcrypt.compare(password, user.password, function (error, isMatch) {
          if (error) {
            throw error;
          } else if (!isMatch) {
            console.log("ye" + password + user.password);
            console.log("Password doesn't match!");
            res.status(401).send({ message: "*Password is Incorrect*" });
          } else {
            console.log("Password matches!");
            //local storeage send json
            //return res.json(user);
            res.status(202).send({ user: user });
          }
        });
      } else {
        console.log("Email not Verified");
        res.status(403).send({ message: "*Email is not Verified*" });
      }
    } else {
      res.status(405).send({ message: "*User is not registered*" });
    }
  });
};

//create userGoogle that checks if database has email
//if not then use the creatUser funct and utilize jti token
//if so then use get user funct and utilize jti token

// This function verifies that the user has inputted
// the correct token and CAN send a confirmation email
// FIXME:
// Implement button instead of token for verify email
*/
export const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!userId || !OTP.trim())
    return sendError(res, 'Invalid request, missing parameters!');

  if (!isValidObjectId(userId)) return sendError(res, 'Invalid user id! ');

  const user = await Users.findById(userId);
  if (!user) return sendError(res, 'User not found!');

  if (user.verified) return sendError(res, 'This account is already verified!');

  const token = await VerificationToken.findOne({ owner: user._id });
  if (!token) return sendError(res, 'User not found!');

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, 'Please provide a valid token!');

  user.verified = true;

  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  // If everything is successful
  res.json({
    success: true,
    message: 'Email verified!',
    user: { name: user.name, email: user.email, id: user._id },
  });
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

export const getCurrentUser = async (req, res) => {
  const { _id } = req.body;

  Users.findOne({ _id: _id }, (err, user) => {
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
  const { userId, stateIdx, cityId, memoryId, date, description, image } =
    req.body;

  let cityIdx = 0;
  let memoryIdx = 0;

  //create user const var
  const user = await Users.findById(userId);
  for (let i = 0; i < user.states[stateIdx].cities.length; i++) {
    if (user.states[stateIdx].cities[i].city == cityId) {
      cityIdx = i;
      break;
    }
  }
  for (
    let j = 0;
    j < user.states[stateIdx].cities[cityIdx].memories.length;
    j++
  ) {
    if (user.states[stateIdx].cities[cityIdx].memories[j]._id === memoryId) {
      memoryIdx = j;
      break;
    }
  }

  console.log(
    user.states[stateIdx].cities[cityIdx].memories[memoryIdx].description
  );

  //create and populate updated memory
  const editedMemory =
    user.states[stateIdx].cities[cityIdx].memories[memoryIdx];
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
};

//function to delete an existing memory
export const deleteMemory = async (req, res) => {
  //receieve memory ObjectID, state index, city index, memory index
  const { userId, stateIdx, cityIdx, memoryIdx } = req.body;

  //create user const var
  const user = await Users.findById(userId);

  //delete the memory at the recieved memory index
  user.states[stateIdx].cities[cityIdx].memories.splice(memoryIdx, 1);

  //if memories is empty, splice city and recieved city index
  if (user.states[stateIdx].cities[cityIdx].memories.length == 0) {
    user.states[stateIdx].cities.splice(cityIdx, 1);
  }

  //if cities is empty, splice state and recieved state index
  if (user.states[stateIdx].cities.length == 0) {
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
};
