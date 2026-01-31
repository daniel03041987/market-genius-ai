import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-listing", async (req, res) => {
  try {
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const prompt = `Create a high-converting Amazon product listing for: ${product}. Include title, 5 bullet points, and a persuasive product description.`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL,
        input: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({ error: "AI generation failed", details: data });
    }

    res.json({ result: data.output_text });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
