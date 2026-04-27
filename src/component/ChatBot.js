import { useState } from "react";

function ChatBot({ onRecommend }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 🎬 I’m your AI Movie Assistant!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
       const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
          process.env.REACT_APP_GEMINI_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: input }]
              }
            ]
          })
        }
      );
      const data = await res.json();
       const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        " your chat limit  is over 😢 try again ";


      setMessages([...updated, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages([
        ...updated,
        { role: "bot", text: "Error connecting Gemini 😢" }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(true)}>
        🤖
      </button>

      {open && (
        <div className="chatbox">

          <div className="chat-header">
            <span>🎬 AI Movie Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="message bot">Thinking...</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              placeholder="Ask anything about movies..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>

        </div>
      )}
    </>
  );
}

export default ChatBot;