export default async function handler(req, res) {
  const url = "https://www.binance.com/bapi/composite/v1/public/cms/article/list?page=1&pageSize=20&type=1";

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json, text/plain, */*"
      }
    });

    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return res.status(r.status).send(text || `Upstream status ${r.status}`);
    }

    const json = await r.json();
    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
    return res.status(200).json(json);
  } catch (err) {
    console.error("proxy error:", err);
    res.status(500).json({ error: String(err) });
  }
}
