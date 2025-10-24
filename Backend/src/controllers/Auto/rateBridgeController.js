import { getRateQuote } from "../services/rateBridgeService.js";

export async function rateBridgeHandler(req, res) {
  try {
    const result = await getRateQuote(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
