import React from "react";
import "./detail.css";
import arrowDown from "./../../../image/arrowDown.png";
import arrowUp from "./../../../image/arrowUp.png";
import download from "./../../../image/download.png";
import avatar from "./../../../image/avatar.png";

export const Detail = () => {
  return <div className="detail">
  <div className="user">
    <img src={avatar} alt="" />
    <h2>james Faber </h2>
    <p>Lorem ipsum dolor sit amet.</p>
  </div>
  <div className="info">
    <div className="option">
      <div className="title">
        <span>Chat Settings</span>
        <img src={arrowUp} alt="" />
      </div>
    </div>
    <div className="option">
      <div className="title">
        <span>Chat Settings</span>
        <img src={arrowUp} alt="" />
      </div>
    </div>
    <div className="option">
      <div className="title">
        <span>Privacy & help</span>
        <img src={arrowUp} alt="" />
      </div>
    </div>
    <div className="option">
      <div className="title">
        <span>Shared photos</span>
        <img src={arrowDown} alt="" />
      </div>
      <div className="photos">
        <div className="photoItem">
          <div className="photoDetail">
            <img
              src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
            />
            <span>photo_2024_2.png</span>
          </div>
          <img src={download} alt="" className="icon" />
        </div>
        <div className="photoItem">
          <div className="photoDetail">
            <img
              src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
            />
            <span>photo_2024_2.png</span>
          </div>
          <img src={download} alt="" className="icon" />
        </div>
        <div className="photoItem">
          <div className="photoDetail">
            <img
              src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
            />
            <span>photo_2024_2.png</span>
          </div>
          <img src={download} alt="" className="icon" />
        </div>
        <div className="photoItem">
          <div className="photoDetail">
            <img
              src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt=""
            />
            <span>photo_2024_2.png</span>
          </div>
          <img src={download} alt="" className="icon" />
        </div>
      </div>
    </div>
    <div className="option">
      <div className="title">
        <span>Shared Files</span>
        <img src={arrowUp} alt="" />
      </div>
    </div>
    <button>
      Block
    </button>
  </div>
</div>;
};
export default Detail;
