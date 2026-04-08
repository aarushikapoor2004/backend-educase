function validateSchoolInput(req, res, next) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name is required." });
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    return res.status(400).json({ error: "address is required." });
  }

  // check lat/lng are actual numbers and within range
  const parsedLat = parseFloat(latitude);
  const parsedLng = parseFloat(longitude);

  if (isNaN(parsedLat) || parsedLat < -90 || parsedLat > 90) {
    return res.status(400).json({ error: "latitude must be between -90 and 90." });
  }

  if (isNaN(parsedLng) || parsedLng < -180 || parsedLng > 180) {
    return res.status(400).json({ error: "longitude must be between -180 and 180." });
  }

  next();
}

module.exports = { validateSchoolInput };