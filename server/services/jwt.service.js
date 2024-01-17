const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function generateAccessToken(userId) {
  try {
    const secretCode = process.env.JWT_SECRET_TOKEN;
    const expirationTime = '1hr';
    return jwt.sign({ _id: userId }, secretCode, { expiresIn: expirationTime });
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Failed to generate access token');
  }
}

module.exports = { generateAccessToken };
