import { useEffect, useRef, useState } from "react";
import "./chat.css";
import video from "./../../../image/video.png";
import info from "./../../../image/info.png";
import phone from "./../../../image/phone.png";
import userOne from "./../../../images/user/user-01.png";
import img from "./../../../image/img.png";
import camera from "./../../../image/camera.png";
import mic from "./../../../image/mic.png";
import emoji from "./../../../image/emoji.png";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

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
      {/* Top Section */}
      <div className="top">
        <div className="user">
          <img src={userOne} alt="User" />
          <div className="texts">
            <span>James Faber</span>
            <p>James is a handsome young man</p>
          </div>
        </div>
        <div className="icons">
          <img src={phone} alt="Call" />
          <img src={video} alt="Video Call" />
          <img src={info} alt="Info" />
        </div>
      </div>

      {/* Chat Center Section */}
      <div className="center">
        <div className="message">
          <img src={userOne} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipi\bus viverra turpis,
              eu congue purus volutpat pellentesque.
            </p>
            <span>1 min ago</span>
          </div>
        </div>{" "}
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipi\bus viverra turpis,
              eu congue purus volutpat pellentesque.
            </p>
            <span>1 min ago</span>
          </div>
        </div>{" "}
        <div className="message">
          <img src={userOne} alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipi\bus viverra turpis,
              eu congue purus volutpat pellentesque.
            </p>
            <span>1 min ago</span>
          </div>
        </div>{" "}
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipi\bus viverra turpis,
              eu congue purus volutpat pellentesque.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        <div className="icons">
          <img src={img} alt="Add Image" />
          <img src={camera} alt="Camera" />
          <img src={mic} alt="Microphone" />
        </div>
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
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <EmojiPicker
              onEmojiClick={handleEmoji}
              searchDisabled={true}
              height={350}
            />
          )}
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
