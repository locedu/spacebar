const loginService = require('../services/loginService');

exports.login = async (req, res) => {
    try {
        const { user, token } = await loginService.loginUser(req.body);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
