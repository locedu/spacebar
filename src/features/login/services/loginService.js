const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

const activityModel = require('../../activity/models/activityModel'); // Import the activity model

const profileModel = require('../../profile/models/profileModel');  // Import the profile model

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


    // Log the login activity (after successful login)
    await activityModel.createActivity({
        userId: user.id,
        targetType: 'LOGIN',  // Activity type
        targetId: user.id,    // User's own ID since they logged in
        createdAt: new Date(), // Ensure timestamp is captured
    });

    // Update the lastLogin field in the profile (assuming the profile model handles it)
    await profileModel.updateProfile(user.id, { lastLogin: new Date() });


    // Generate JWT token including role
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },  // ✅ Added `role`
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpiresIn }
    );

    return { user, token };
};
