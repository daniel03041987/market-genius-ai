import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-listing", async (req, res) => {
  try {
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL,
        input: `Create an Amazon product listing for: ${product}`
      })
    });

    const data = await response.json();

    res.json({
      result: data.output?.[0]?.content?.[0]?.text || "No response"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
