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
  // addMessage,
  setToggleEmojiPicker,
  setText,
  selectText,
  selectChatState,
} from "./../../../../store/features/UBChat/chatSlice";

export const Chat = () => {
  const dispatch = useDispatch();
  
  const chat = useSelector(selectChatState);
  const endRef = useRef<HTMLDivElement | null>(null);

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

    // dispatch(addMessage(tempMessage)); // Optimistic UI update
    dispatch(setText("")); // Clear input field

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
};

export default Chat;
