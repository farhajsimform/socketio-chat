import React, { useEffect, useState } from "react";
import { socket, GetChats } from "./socket/socket";
import "./App.css";
import { randomName, removeDuplicateObjects } from "./utils";
const profileImage = "https://picsum.photos/200/300";
const randomProfileName = randomName;

interface IMessage {
  name: string;
  time: string;
  text: string;
  imageUrl: string;
  isBot?: boolean;
}

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const initialMessages: IMessage[] = [
    {
      name: "BOT 1",
      time: "12:45",
      text: "Hi, welcome to SimpleChat! Go ahead and send me a message. 😄",
      imageUrl: "https://picsum.photos/200/300",
      isBot: true,
    },
  ];
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);

  useEffect(() => {
    GetChats((data) => {
      console.log(data);
      setMessages((pre) => removeDuplicateObjects([...pre, data]));
    });
  }, []);

  const sendMessage = () => {
    if (message === "") return;

    socket.emit("chats", {
      name: randomProfileName,
      time: new Date().toLocaleTimeString(),
      text: message,
      imageUrl: profileImage,
      id: crypto.getRandomValues(new Uint32Array(1))[0],
    });

    setMessage("");
  };

  return (
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt"></i> SimpleChat
        </div>
        <div className="msger-header-options">
          <span>
            <i className="fas fa-cog"></i>
          </span>
        </div>
      </header>

      <main className="msger-chat">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`msg ${message.isBot ? "left-msg" : "right-msg"}`}
          >
            <div
              className="msg-img"
              style={{ backgroundImage: `url(${message.imageUrl})` }}
            ></div>

            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">{message.name}</div>
                <div className="msg-info-time">{message.time}</div>
              </div>

              <div className="msg-text">{message.text}</div>
            </div>
          </div>
        ))}
      </main>

      <input
        type="text"
        className="msger-input"
        placeholder="Enter your message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        type="submit"
        className="msger-send-btn"
        onClick={() => {
          sendMessage();
        }}
      >
        Send
      </button>
    </section>
  );
};

export default App;
