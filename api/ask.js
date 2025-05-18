const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700,
      temperature: 0.7,
    });

    const reply = completion.choices?.[0]?.message?.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "OpenAI failed." });
  }
}

