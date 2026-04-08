export default async function handler(req, res) {
  const { vehicle } = req.query;

  if (!vehicle) {
    return res.status(400).json({ error: "Vehicle required" });
  }

  try {
    const response = await fetch(
      `https://vehicle-chalan-check-api-by-abhigyan.onrender.com/api/challan?vehicle_number=${vehicle}`
    );

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch {
    res.status(500).json({ error: "Failed to fetch" });
  }
}
