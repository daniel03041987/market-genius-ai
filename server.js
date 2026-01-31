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

    const prompt = `
Create a high-converting Amazon-style product listing for: ${product}

Return ONLY valid JSON in this exact format:
{
  "title": "...",
  "bullets": ["...", "...", "...", "...", "..."],
  "description": "..."
}

Rules:
- Title must sound premium and include power words
- Bullet points should highlight features and benefits
- Description must be persuasive and natural, not robotic
- Do NOT include markdown or extra text outside JSON
`;

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL,
        input: prompt,
        temperature: 0.7
      })
    });

    const data = await openaiResponse.json();

    // Extract AI text from new Responses API format
    const aiText = data.output[0].content[0].text;

    const parsed = JSON.parse(aiText);

    res.json(parsed);

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
