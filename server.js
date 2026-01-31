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

    const prompt = `Create a high-converting Amazon product listing for: ${product}`;

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
    res.json({ listing: data.output[0].content[0].text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
