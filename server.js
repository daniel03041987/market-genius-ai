app.post("/generate-listing", async (req, res) => {
  try {
    const { product } = req.body;

    const prompt = `
Create an Amazon-style product listing for: ${product}

Return ONLY in JSON format like this:
{
  "title": "...",
  "bullets": ["...", "...", "...", "...", "..."],
  "description": "..."
}
`;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await openaiResponse.json();

    const aiText = data.choices[0].message.content;

    const parsed = JSON.parse(aiText);

    res.json(parsed);

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});
