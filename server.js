import express from "express";

const app = express();

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Market Genius AI is LIVE 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
