function () {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const log = document.getElementById("chat-log");

  // Frontend talks only to your own backend. Put the model API key on the
  // server, never in this file or any other browser-facing script.
  const CHAT_API_URL = "/api/chat";

  if (!form || !input || !log) {
    return;
  }

  function addMessage(text, role) {
    const message = document.createElement("p");
    message.className = "chat-message " + role;
    message.textContent = text;
    log.appendChild(message);
    log.scrollTop = log.scrollHeight;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
      return;
    }

    addMessage(text, "user");
    input.value = "";
    input.disabled = true;

    fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Chat API is not available yet.");
        }
        return response.json();
      })
      .then(function (data) {
        const reply =
          data && data.reply
            ? data.reply
            : "The chatbot API did not return a reply.";
        addMessage(reply, "bot");
      })
      .catch(function () {
        addMessage(
          "The chatbot frontend is ready, but no backend API is connected yet. Add a server route at /api/chat and keep the API key on the server.",
          "bot"
        );
      })
      .finally(function () {
        input.disabled = false;
        input.focus();
      });
  });
})();
