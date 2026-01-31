import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

/* ===============================
   TEST ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("Market Genius AI is LIVE 🚀");
});

/* ===============================
   AI LISTING GENERATOR ENDPOINT
================================ */
app.post("/generate-listing", (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ error: "No product provided" });
  }

  res.json({
    title: Best ${product} for 2026 – Premium Quality,
    bullets: [
      Top-rated ${product} with advanced features,
      "Fast shipping and trusted quality",
      "Perfect for everyday use",
      "High customer satisfaction",
      "Limited stock available"
    ],
    description: This ${product} is designed for modern customers in 2026 who want performance, style, and reliability in one product. Built with premium materials and tested for durability, it delivers excellent value and long-lasting quality.
  });
});

/* ===============================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
