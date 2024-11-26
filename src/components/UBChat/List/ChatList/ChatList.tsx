import { useEffect, useState } from "react";
import "./chatList.css";
import search from "./../../../../image/search.png";
import minus from "./../../../../image/minus.png";
import plus from "./../../../../image/plus.png";

export const ChatList = () => {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src={search} alt="" />
          <input type="text" placeholder="search" />
        </div>
        <img
          src={addMode ? minus : plus}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default ChatList;
