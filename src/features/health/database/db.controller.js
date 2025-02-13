const prisma = require("../../../config/db");

exports.checkDatabase = async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: "OK", db: "Connected" });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};
