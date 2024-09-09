const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const expiration = '3h';


// --------------------------------------------------------------



//// ------ Function to extract and verify the token, then return the user ------>>
//// ---------------------------------------------------------------------------->>
const getUserFromToken = async (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    return null;
  }

  try {
    //--- JWT method verifys if token and secret for user is correct then return's user by id --->>
    const decoded = jwt.verify(token, secret);
    const user = await User.findById(decoded.data._id);
    return user;

  } catch (error) {
    console.error("Token Verification Error:", error.message);
    return null;
  }
};


//// ------ Function to sign a JWT Token ------>>
//// ------------------------------------------>>
const signToken = ({ email, _id }) => {
  const payload = { email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { getUserFromToken, signToken };