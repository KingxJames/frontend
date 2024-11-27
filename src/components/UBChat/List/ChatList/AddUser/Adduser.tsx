import React from "react";
import "./addUser.css";
import avatar from "./../../../../../image/avatar.png";

export const AddUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src={avatar} alt="" />
          <span>John doe</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
