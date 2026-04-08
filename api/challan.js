export default async function handler(req, res) {
  const { vehicle } = req.query;

  if (!vehicle) {
    return res.status(400).json({ error: "Vehicle number required" });
  }

  try {
    const response = await fetch(
      `https://vehicle-chalan-check-api-by-abhigyan.onrender.com/api/challan?vehicle_number=${vehicle}`
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ error: "Invalid API response" });
    }

    // 🔥 HANDLE DIFFERENT FORMATS
    if (!Array.isArray(data)) {
      data = data.data || data.result || [];
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "Backend error",
      message: err.message
    });
  }
}
