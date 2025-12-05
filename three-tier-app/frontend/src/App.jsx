import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // ✅ Backend Health
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setHealth(JSON.stringify(data, null, 2)))
      .catch(() => setHealth("Error connecting to backend"));
  }, []);

  // ✅ Send Message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      const data = await res.json();
      console.log("Message saved:", data);
      setMessage("");

      // Refresh messages list
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // ✅ Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>React + Node + MongoDB</h1>

      <h2>Backend Health</h2>
      <pre>{health}</pre>

      <h2>Send Message</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />
      <button
        onClick={sendMessage}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Send
      </button>

      <h2>Messages</h2>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  );
}

export default App;

