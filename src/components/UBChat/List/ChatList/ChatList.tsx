import { useEffect, useState } from "react";
import "./chatList.css";
import search from "./../../../../image/search.png";
import minus from "./../../../../image/minus.png";
import plus from "./../../../../image/plus.png";
import avatar from "./../../../../image/avatar.png";
import AddUser from "./AddUser/Adduser";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, selectUsers } from "../../../../../store/features/authSlice";
import { useFetchUsersQuery } from "../../../../../store/services/authAPI";
import { setActiveUser } from "../../../../../store/features/UBChat/chatSlice";


export const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  // Use selector to get the token and pass it as a parameter to the query
  const token = useSelector((state: any) => state.auth.token);

  // Use the query hook to fetch users with the token
  const { data, error, isLoading } = useFetchUsersQuery(token);

  useEffect(() => {
    if (data) {
      // Dispatch users to the Redux store when data is available
      dispatch(setUsers(data)); // Ensure `data` is the array of users
    }
  }, [data, dispatch]);

  // Filter users based on the search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="chatList">
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

      {isLoading && <p>Loading users...</p>}
      {error && <p>Error fetching users</p>}

      {filteredUsers.map((user: any) => (
        <div
          className="item"
          key={user.id}
          onClick={() => dispatch(setActiveUser(user.name))} // Dispatch action
        >
                    <img src={user.picture || avatar} alt={user.name} />
          <div className="texts">
            <span>{user.name}</span>
            <p>{user.email}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
