// controller

exports.checkCORS = (req, res) => {
  res.status(200).json({ status: "CORS is enabled" });
};
