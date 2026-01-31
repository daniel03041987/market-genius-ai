const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Market Genius AI Server is running!");
});

// Example API route
app.post("/generate-listing", (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ error: "Product name is required" });
  }

  const response = {
    title: `🔥 ${product} – Best Quality on the Market`,
    bullets: [
      `✔ Premium ${product}`,
      "✔ High Quality Materials",
      "✔ Fast Shipping",
      "✔ Satisfaction Guaranteed"
    ],
    description: `This ${product} is designed for customers who want quality and performance at the best price.`
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
