import React from "react";
import { ChatList } from "./ChatList/ChatList";
import UserInfo from "./UserInfo/UserInfo";
import "./list.css";

export const List = () => {
  return <div className="list">
    <UserInfo/>
    <ChatList/>
  </div>;
};

export default List;
