const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const authConfig = require('../../../config/authConfig');  // for JWT secret and expiration

exports.loginUser = async ({ email, password }) => {
    const user = await loginModel.findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT token including role
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },  // ✅ Added `role`
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpiresIn }
    );

    return { user, token };
};
