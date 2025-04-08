import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../../../common/ClickOutside";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { logout } from "../../../../store/features/authSlice";

export const DropdownUser: React.FC = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const name = useSelector((state: RootState) => state.auth.name);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-4"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
        to="#"
      >
        <span className="hidden lg:flex items-center space-x-2 text-right">
          <span className="text-sm font-medium text-black dark:text-white">
            {name}
          </span>
        </span>

        <ArrowDropDownIcon />
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <SettingsIcon />
                Settings
              </Link>
            </li>
          </ul>
          <button
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            onClick={handleLogout} // Use the handleLogout function
          >
            <LogoutIcon />
            Log Out
          </button>
        </div>
      )}
    </ClickOutside>
  );
};
