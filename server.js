const express = require("express");
const app = express();

const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HOME PAGE (simple UI)
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Market Genius AI</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 0 16px; }
      input { width: 100%; padding: 12px; font-size: 16px; margin: 10px 0; }
      button { padding: 12px 16px; font-size: 16px; cursor: pointer; }
      pre { background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <h2>Market Genius AI — Listing Generator</h2>
    <p>Type a product name and click Generate.</p>
    <input id="product" placeholder="e.g. Wireless Bluetooth Headphones" />
    <button onclick="generate()">Generate</button>
    <h3>Result:</h3>
    <pre id="output">Waiting...</pre>

    <script>
      async function generate() {
        const product = document.getElementById("product").value.trim();
        if (!product) {
          alert("Please enter a product name");
          return;
        }

        document.getElementById("output").textContent = "Generating...";

        try {
          const res = await fetch("/generate-listing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product })
          });

          const data = await res.json();
          document.getElementById("output").textContent = JSON.stringify(data, null, 2);
        } catch (err) {
          document.getElementById("output").textContent = "Error: " + err.message;
        }
      }
    </script>
  </body>
  </html>
  `);
});

// API ENDPOINT
app.post("/generate-listing", (req, res) => {
  const { product } = req.body;

  if (!product) {
    return res.status(400).json({ error: "No product provided" });
  }

  // Mock AI output for now (we’ll connect OpenAI later)
  const response = {
    title: `Best ${product} for 2026 - Premium Quality`,
    bullets: [
      `Top-rated ${product} with advanced features`,
      "Fast shipping and trusted quality",
      "Perfect for everyday use",
      "High customer satisfaction",
      "Limited stock available"
    ],
    description: `This ${product} is designed for modern customers in 2026. Built with premium materials and tested for durability, it delivers excellent value and long-lasting quality.`
  };

  return res.json(response);
});

// START SERVER
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
