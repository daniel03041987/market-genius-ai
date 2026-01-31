import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Test root
app.get("/", (req, res) => {
  res.send("Market Genius AI is LIVE 🚀");
});

// 🔥 AI Listing Generator Endpoint
app.post("/generate-listing", (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ error: "No product provided" });
  }

  res.json({
    title: 🔥 Best ${product} for 2026 – Premium Quality,
    bullets: [
      High quality ${product},
      "Fast shipping",
      "Top rated by customers"
    ],
    description: This ${product} is designed for performance and modern lifestyle.
  });
});

app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
