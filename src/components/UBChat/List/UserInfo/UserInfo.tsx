import React from "react";
import  more  from "./../../../../image/more.png";
import  video  from "./../../../../image/video.png";
import  edit  from "./../../../../image/edit.png"
import userOne from "./../../../../images/user/user-01.png";

import "./userInfo.css";


export const UserInfo = () => {
  return (
    <div className='userInfo'>
      <div className="user">
        <img src={userOne} alt="" />
        {/* <h2>{currentUser.username}</h2> */}
      </div>
      <div className="icons">
        <img src={more} alt="" />
        <img src={video} alt="" />
        <img src={edit} alt="" />
      </div>
    </div>
  )};

export default UserInfo;