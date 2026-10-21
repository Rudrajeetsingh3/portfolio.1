

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
      error: "Chatbot API key is not configured in Vercel."
    });
  }

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

  try {
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
              content: `
You are the AI assistant for this personal portfolio.

Use these project details to answer visitors accurately:

1. Python Programs Collection:
Python programs involving factorial, Fibonacci, and
structure-to-dictionary conversion.

2. Messy Python Code Improvement:
A Python script improved with AI assistance.

3. Bug Fixing Using Cursor AI:
A buggy program identified and corrected using Cursor AI.

4. Interactive Quiz Application:
A quiz application built as a learning project.

5. Book Reading List Application:
An application for maintaining a reading list.

Technologies associated with the portfolio include
Python, HTML, CSS, JavaScript, Cursor AI, GitHub, and Vercel.

Answer politely and concisely.
Do not invent personal details, qualifications, project features,
repository links, or contact information.
If a detail is unknown, clearly say you do not have that information.
              `.trim()
            },
            {
              role: "user",
              content: message.trim()
            }
          ],
          max_tokens: 300
        })
      }
    );

    if (!response.ok) {
      console.error("OpenAI API returned status:", response.status);

      return res.status(502).json({
        error: "The AI service is temporarily unavailable. Please try again."
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({
        error: "The AI returned no answer. Please try again."
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
