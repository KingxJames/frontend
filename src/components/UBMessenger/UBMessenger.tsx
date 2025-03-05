import React from "react";
import UBMessengerChat from "./UBMessengerChat/UBMessengerChat";
import UBMessengerDetail from "./UBMessengerDetail/UBMessengerDetail";
import UBMessengerList from "./UBMessengerList/UBMessengerListChats";

export const UBMessenger: React.FC = () => {
  return (
    <div>
        <UBMessengerList />
        <UBMessengerChat />
        {/* <UBMessengerDetail /> */}
    </div>
  );
};

export default UBMessenger;