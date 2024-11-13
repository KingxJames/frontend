import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../../../common/ClickOutside";
import { useGetUserQuery } from "../../../../store/services/authAPI"; // Import the hook
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, UseSelector } from "react-redux";
import { selectName } from "../../../../store/features/authSlice";


export const DropdownUser: React.FC = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const { data: userProfile } = useGetUserQuery(); // Fetch user data using the query

    const userName = useSelector(selectName)

    // Handle loading and error states
    // const username =  userProfile?.userName || "Guest";

    return (
        <ClickOutside
            onClick={() => setDropdownOpen(false)}
            className="relative"
        >
            {/* User Profile Section */}
            <Link
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-4"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                to="#"
            >
                {/* Username Display */}
                <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">
                        {userName}
                    </span>
                </span>

                {/* Dropdown Arrow Icon */}
                <ArrowDropDownIcon />
            </Link>

            {/* <!-- Dropdown Start --> */}
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
                    <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                        <LogoutIcon />
                        Log Out
                    </button>
                </div>
            )}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};
