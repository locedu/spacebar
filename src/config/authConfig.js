module.exports = {
    jwtSecret: process.env.JWT_SECRET || "your-secure-secret",  // Change this to a secure value
    jwtExpiresIn: "3m"  // Token expiration time..
};
