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
import {
  addMessage,
  setToggleEmojiPicker,
  setText,
  selectText,
  selectChatState,
} from "./../../../../store/features/UBChat/chatSlice";
import { useCreateMessageMutation } from "./../../../../store/services/chatAPI"; // Import the hook to create a message

export const Chat = () => {
  const dispatch = useDispatch();
  // // const { messages, activeUser, isEmojiPickerOpen } = useSelector(
  //   (state: RootState) => state.chat
  // );
  const text = useSelector(selectText);
  const chat = useSelector(selectChatState);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [createMessage] = useCreateMessageMutation(); // Hook for creating messages

  const handleSendMessage = async () => {
    if (!chat.text.trim() || !chat.activeUser) return;

    // Prepare the message object
    const newMessage = {
      text: chat.text,
      sender: "own",
      timestamp: new Date().toISOString(),
      user: chat.activeUser,
    };

    const tempMessage = {
      id: Date.now().toString(),
      ...newMessage,
    };

    dispatch(addMessage(tempMessage)); // Optimistic UI update
    dispatch(setText("")); // Clear input field

    // Send the message to the backend
    try {
      const savedMessage = await createMessage(newMessage).unwrap(); // Save message to DB
      dispatch(addMessage({ ...savedMessage })); // Update with server response (if needed)
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  
  const handleEmoji = (emojiData: EmojiClickData): void => {
    dispatch(setText(chat.text + emojiData.emoji)); // Concatenate emoji to chat.text
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={userOne} alt="User" />
          <div className="texts">
            <span>{chat.activeUser || "No User Selected"}</span>
          </div>
        </div>
      </div>

      <div className="center">
        {chat.messages
          .filter((msg) => msg.user === chat.activeUser)
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
        <input
          type="text"
          placeholder="Type a message"
          value={chat.text}
          onChange={(e) => dispatch(setText(e.target.value))}
        />
        <div className="emoji">
          <img
            src={emoji}
            alt="Open Emoji Picker"
            onClick={() => dispatch(setToggleEmojiPicker())}
          />
          {chat.isEmojiPickerOpen && (
            <EmojiPicker
              onEmojiClick={(emojiData) => handleEmoji(emojiData)}
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
