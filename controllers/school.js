const db = require("../config/db");


function calcDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  try {
    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const [rows] = await db.execute(sql, [
      name.trim(),
      address.trim(),
      parseFloat(latitude),
      parseFloat(longitude),
    ]);

    res.status(201).json({
      message: "School added.",
      id: rows.insertId,
    });
  } catch (err) {
    console.error("addSchool error:", err.message);
    res.status(500).json({ error: "Something went wrong." });
  }
}

async function listSchools(req, res) {
  const lat = parseFloat(req.query.latitude);
  const lng = parseFloat(req.query.longitude);

  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ error: "latitude and longitude are required." });
  }

  try {
    const [data] = await db.execute("SELECT * FROM schools");

    const results = data.map((school) => ({
      ...school,
      distance_km: parseFloat(calcDistance(lat, lng, school.latitude, school.longitude).toFixed(2)),
    }));

    
    results.sort((a, b) => a.distance_km - b.distance_km);

    res.status(200).json({
      userLocation: { lat, lng },
      total: results.length,
      schools: results,
    });
  } catch (err) {
    console.error("listSchools error:", err.message);
    res.status(500).json({ error: "Something went wrong." });
  }
}

module.exports = { addSchool, listSchools };