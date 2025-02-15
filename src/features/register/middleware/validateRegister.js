module.exports = (req, res, next) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Email, password, and username are required' });
    }
    next();
};
