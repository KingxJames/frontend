import { useEffect, useRef, useState } from "react";
import "./chat.css";
import userOne from "./../../../images/user/user-01.png";
// import img from "./../../../image/img.png";
// import camera from "./../../../image/camera.png";
// import mic from "./../../../image/mic.png";
import emoji from "./../../../image/emoji.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../../../../store/store";
import { addMessage, setToggleEmojiPicker } from "./../../../../store/features/UBChat/chatSlice";

export const Chat = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { messages, activeUser, isEmojiPickerOpen } = useSelector((state: RootState) => state.chat);
  const [text, setText] = useState("");

  const handleSendMessage = () => {
    if (!text.trim() || !activeUser) return;

    dispatch(
      addMessage({
        id: Date.now().toString(),
        text,
        sender: "own",
        timestamp: new Date().toLocaleTimeString(),
        user: activeUser,
      })
    );
    setText("");
  };

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEmoji = (emojiData: EmojiClickData): void => {
    setText((prev: string) => prev + emojiData.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={userOne} alt="User" />
          <div className="texts">
          <span>{activeUser || "No User Selected"}</span>
          </div>
        </div>
      </div>

      <div className="center">
        {messages
          .filter((msg) => msg.user === activeUser) // Filter messages by active user
          .map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === "own" ? "own" : ""}`}
            >
              <div className="texts">
                <p>{msg.text}</p>
                <span>{msg.timestamp}</span>
              </div>
            </div>
          ))}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        {/* <div className="icons">
          <img src={img} alt="Add Image" />
          <img src={mic} alt="Microphone" />
        </div> */}
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src={emoji}
            alt="Open Emoji Picker"
            onClick={() => dispatch(setToggleEmojiPicker())}
          />
          {isEmojiPickerOpen && (
            <EmojiPicker
              onEmojiClick={(emojiData) =>
                setText((prev) => prev + emojiData.emoji)
              }
              searchDisabled={true}
              height={350}
            />
          )}
        </div>
        <button className="sendButton" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
