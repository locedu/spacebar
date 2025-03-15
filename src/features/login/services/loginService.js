const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');
const activityModel = require('../../activity/models/activityModel'); 
const profileModel = require('../../profile/models/profileModel');  
const authConfig = require('../../../config/authConfig');  

exports.loginUser = async ({ email, password }) => {
    const user = await loginModel.findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // ✅ Check if the user is blocked before allowing login
    if (user.status === 'BLOCKED') {
        throw new Error('Your account has been blocked. Contact support for assistance.');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // Log the login activity (after successful login)
    await activityModel.createActivity({
        userId: user.id,
        targetType: 'LOGIN',
        targetId: user.id,
        createdAt: new Date(),
    });

    // Update the lastLogin field in the profile
    await profileModel.updateProfile(user.id, { lastLogin: new Date() });

    // Generate JWT token including role
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        authConfig.jwtSecret,
        { expiresIn: authConfig.jwtExpiresIn }
    );

    return { user, token };
};
