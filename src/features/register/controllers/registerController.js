const registerService = require('../services/registerService');

exports.register = async (req, res) => {
    try {
        const user = await registerService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
