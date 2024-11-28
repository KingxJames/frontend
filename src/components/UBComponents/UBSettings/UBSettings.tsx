import React from "react";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import UBBreadcrumb from "../../../common/UBBreadcrumbs/UBBreadcrumbs";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration';
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectPhoneNumber,
  setPhoneNumber,
  setPersonalEmail,
} from "../../../../store/features/authSlice";

export const UBSettings: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const phoneNumber = useSelector(selectPhoneNumber);

  return (
    <>
      <UBBreadcrumb pageName="Settings" />
      <div className="ml-[15%] mt-[5%] max-w-3700">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                      htmlFor="phoneNumber"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3">
                        <PermIdentityIcon />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue={user?.name}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3">
                        <LocalPhoneIcon />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                      htmlFor="emailAddress"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3">
                        <EmailIcon />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                      htmlFor="workEmail"
                    >
                      Work Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3">
                        <EmailIcon />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="workEmail"
                        id="workEmail"
                        placeholder="devidjond45@@ub.edu.bz"
                        defaultValue={user?.email}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                      htmlFor="organization"
                    >
                      Organization
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3 ">
                        <CorporateFareIcon />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="org"
                        name="organization"
                        id="organization"
                        placeholder="University of Belize "
                        defaultValue="University of Belize"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                      htmlFor="phoneNumber"
                    >
                    Role
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-3">
                        <CompassCalibrationIcon />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="Role"
                        id="Role"
                        placeholder=""
                        defaultValue=""
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UBSettings;
