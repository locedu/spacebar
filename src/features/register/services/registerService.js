const bcrypt = require('bcrypt');
const registerModel = require('../models/registerModel');

exports.registerUser = async ({ email, password, username }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await registerModel.createUser({ email, password: hashedPassword, username });
};
