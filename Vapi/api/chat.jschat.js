
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Only POST requests are allowed."
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(503).json({
      error: "Chatbot API key is not configured."
    });
  }

  try {
    const message = req.body?.message;

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 1000
    ) {
      return res.status(400).json({
        error: "Please enter a message of up to 1000 characters."
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are Vidhi's portfolio assistant. Answer politely " +
                "about her portfolio, skills, and projects. " +
                "Do not invent personal details or qualifications."
            },
            {
              role: "user",
              content: message.trim()
            }
          ],
          max_tokens: 250
        })
      }
    );

    if (!response.ok) {
      console.error("AI service status:", response.status);
      return res.status(502).json({
        error: "The AI service is temporarily unavailable."
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({
        error: "No reply was returned."
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat API error:", error.message);
    return res.status(500).json({
      error: "Something went wrong. Please try again."
    });
  }
}

