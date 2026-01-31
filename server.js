import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Test route
app.get("/", (req, res) => {
  res.send("Market Genius AI is LIVE 🚀");
});

// AI Listing Generator Endpoint
app.post("/generate-listing", (req, res) => {
  const product = req.body?.product;

  if (!product) {
    return res.status(400).json({ error: "No product provided" });
  }

  res.json({
    title: `Best ${product} for 2026 – Premium Quality`,
    bullets: [
      `High quality ${product}`,
      "Fast shipping",
      "Top rated product",
      "Great value for money"
    ],
    description: `This ${product} is designed for performance, durability, and customer satisfaction. Perfect for everyday use.`
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
