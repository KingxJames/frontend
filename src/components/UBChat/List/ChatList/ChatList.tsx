import { useEffect, useState } from "react";
import "./chatList.css";
import search from "./../../../../image/search.png";
import minus from "./../../../../image/minus.png";
import plus from "./../../../../image/plus.png";
import avatar from "./../../../../image/avatar.png";
import AddUser from "./AddUser/Adduser";
import { useSelector, useDispatch } from "react-redux";
import { setAuthData } from "../../../../../store/features/authSlice";
// import { useFetchUsersQuery } from "../../../../../store/services/authAPI";
import {
  setActiveUser,
  setChatState,
  setSearchText,
} from "../../../../../store/features/UBChat/chatSlice";
import { RootState } from "../../../../../store/store";

interface ChatListProps {
  showSearchBar?: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({ showSearchBar = true }) => {
  const [addMode, setAddMode] = useState(false);
  const [searchText, setSearchText] = useState("");




  

  return (
    <div className="chatList">
      {showSearchBar && ( // Conditionally render the search bar
        <div className="search">
          <div className="searchBar">
            <img src={search} alt="search icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <img
            src={addMode ? minus : plus}
            alt="add icon"
            className="add"
            onClick={() => setAddMode((prev) => !prev)}
          />
        </div>
      )}

     

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;