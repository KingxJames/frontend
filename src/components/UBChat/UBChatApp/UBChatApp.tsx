import React from "react";
import Chat from "../Chat/Chat";
import List from "../List/List";
import Detail from "../Detail/Detail";
import "./UBChatApp.css"

export const UBChatApp = () => {
  return (
  <div className="container">
    <List/>
    <Chat/>
    <Detail/>
  </div>
  )
};

export default UBChatApp;
