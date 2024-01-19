const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const hashPassword = async (password) => {
    try {
        const saltRounds = parseInt(process.env.HashSalt, 10) || 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptHash = await bcrypt.hash(password, salt);

        return bcryptHash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const bcryptComparison = await bcrypt.compare(password, hashedPassword);

        return bcryptComparison;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Failed to compare passwords');
    }
};

module.exports = { hashPassword, comparePassword };
