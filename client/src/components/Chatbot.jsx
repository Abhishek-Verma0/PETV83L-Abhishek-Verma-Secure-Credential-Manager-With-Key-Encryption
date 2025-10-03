import React, { useState, useEffect, useRef } from "react";
import "../styles/Chatbot.css" // your CSS file

const FAQ = [
   {
    triggers: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    response: "Hello 👋! Welcome to <b>Secure-Credential</b>. How can I help you today?",
  },
  {
    triggers: ["thanks", "thank you", "thx"],
    response: "You're welcome! 😊 Always here to help.",
  },
  {
    triggers: ["bye", "goodbye", "see you", "later"],
    response: "Goodbye! 👋 Have a productive coding day!",
  },  
  {
    triggers: ["let's get started", "get started", "start", "register"],
    response: `🚀 <b>Ready to level up your security?</b> 🤩 <br>
Just hit that big <b>"Get Started"</b> or <b>"Register"</b> button on the homepage. <br><br>
I'll help you build your own digital fortress. <br>
It’s faster than making a cup of tea! ☕`,
  },
  {
    triggers: ["what do you do", "who are you", "about you", "cred bot", "what is this"],
    response: `🤖 Hey there! I'm <b>CredBot</b>, your trusty sidekick for Secure Credential Management. <br><br>
Think of me as a friendly robot who guards your passwords in an <b>uncrackable vault 🦸‍♂️</b>. <br><br>
Say goodbye to forgotten passwords and hello to <b>digital peace of mind!</b>`,
  },
  {
    triggers: ["Is this actually secure", "secure", "safe", "data safety", "security"],
    response: `🛡️ Is it secure? <b>Is a dragon's treasure safe?</b> 😉 <br><br>
You bet! Your data is locked down with <b>Bank-Grade 256-bit encryption 🔒</b>. <br><br>
Plus, I operate on a <b>zero-knowledge basis</b> — not even I can see your secrets. <br>
Only <b>you</b> hold the master key! 🔑`,
  },
  {
    triggers: ["features", "show features", "what can you do", "cool features"],
    response: `✨ Ooh, my favorite part! Get ready for some digital magic: <br><br>
⚡️ <b>Blink-and-you-miss-it Access</b> — your credentials, ready whenever you are. <br>
🤫 <b>My Lips Are Sealed</b> — zero-knowledge protocol means your secrets are yours alone. <br>
🌍 <b>Go-Anywhere Vault</b> — access your passwords from laptop, phone, or tablet. <br>
🛡️ <b>Fort Knox Mode</b> — activate Two-Factor Authentication for an extra layer of awesome security!`,
  },
  {
    triggers: ["price", "cost", "is it free", "free", "plans"],
    response: `💸 You're going to love this... my <b>core services are completely FREE! 🥳</b> <br><br>
You get all the essential security powers without spending a single penny. <br>
We're dreaming up some <b>super-powered premium features</b> for the future, so stay tuned! ⭐`,
  },
  {
    triggers: ["support", "help", "contact", "i need to talk to a human"],
    response: `🙋 Even robots know that sometimes you need a <b>human touch!</b> <br><br>
My creators are ready to help. Just scroll down to the <b>"Get in Touch"</b> or <b>"Contact"</b> section at the bottom of the page. <br>
Drop them an email, and they'll zap a reply back to you <b>ASAP ⚡️</b>`,
  },
  {
    triggers: ["legal", "terms", "policy", "t&c", "privacy policy"],
    response: `📜 Ah, the fine print! While I handle the fun stuff, my creators have laid out all the rules. <br><br>
You'll find the <b>Terms & Conditions</b> and <b>Privacy Policy</b> hanging out in the footer at the very bottom of the page. <br>
They're important, I promise! 👍`,
  },
  {
    triggers: ["login help","I'm stuck logging in", "can't login", "login issue", "register issue", "forgot password"],
    response: `😫 Don't you worry, I've got your back! Let's get this sorted: <br><br>
➡️ Existing user? Just hit the <b>"Login"</b> button. <br>
🆕 New around here? Click <b>"Register"</b> to join the club! <br>
🧠 Brain-fog moment? The <b>"Forgot Password?"</b> link on the login page is your best friend. (Happens to the best of us!)`,
  },
  {
    triggers: [],
    response: "❌ Sorry, I didn’t understand. Please try asking differently 🙂",
  },
];

const QUICK_QUESTIONS = [
  "Let's get started! 🚀",
  "What do you do? 🤖",
  "Is this actually secure? 🧐",
  "Show me the cool features! ✨",
  "What's the price? 💸",
  "I need to talk to a human! 🙋",
  "Where's the boring legal stuff? 📜",
  "I'm stuck logging in! 😫",
];


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am Secure Credential Assistant. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [showFirstFour, setShowFirstFour] = useState(true);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const findResponse = (text) => {
    const lc = text.toLowerCase();

    const sortedFAQ = [...FAQ].sort((a, b) => {
      const maxA = Math.max(...a.triggers.map((t) => t.length), 0);
      const maxB = Math.max(...b.triggers.map((t) => t.length), 0);
      return maxB - maxA;
    });

    for (const item of sortedFAQ) {
      if (item.triggers.some((trig) => lc.includes(trig.toLowerCase()))) {
        return item.response;
      }
    }

    return FAQ.find((i) => i.triggers.length === 0).response;
  };

  const sendMessage = (customText) => {
    const text = customText || input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");

    setTimeout(() => {
      const response = findResponse(text);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 500);
  };

  const toggleQuickQuestions = () => {
    setShowFirstFour(!showFirstFour);
  };

  const renderQuickQuestions = () => {
    const questionsToShow = showFirstFour ? QUICK_QUESTIONS.slice(0, 4) : QUICK_QUESTIONS.slice(4, 8);
    return (
      <>
        {questionsToShow.map((q, i) => (
          <button key={i} className="quick-question-btn" onClick={() => sendMessage(q)}>
            {q}
          </button>
        ))}
        <button className="quick-question-btn toggle-btn" onClick={toggleQuickQuestions}>
          {showFirstFour ? "See More" : "See Less"}
        </button>
      </>
    );
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window open">
          <div className="chatbot-header">
                <img 
    src="public/lock_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24 (1).svg" 
    alt="SecureCredential Logo" 
    className="chatbot-header-logo" 
    />
                <span>Secure Credential</span>
            <button onClick={toggleChat}>
              <img
                src="public/close_small_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt="Close"
              />
            </button>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.sender}-msg`}>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          <div className="quick-questions">{renderQuickQuestions()}</div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              placeholder="Type your query..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>
              <img src="public/send.png" alt="Send" />
            </button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        🤖
      </button>
    </div>
  );
};

export default Chatbot;
