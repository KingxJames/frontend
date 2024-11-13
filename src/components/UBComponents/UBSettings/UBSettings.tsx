import React from "react";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EmailIcon from "@mui/icons-material/Email";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import UBBreadcrumb from "../../../common/UBBreadcrumbs/UBBreadcrumbs";

export const UBSettings: React.FC = () => {
    return (
        <>
            <UBBreadcrumb pageName="Settings" />
            <div className="mx-auto max-w-370">
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
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                                                htmlFor="fullName"
                                            >
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-3">
                                                    <PermIdentityIcon />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="fullName"
                                                    id="fullName"
                                                    placeholder="Devid Jhon"
                                                    defaultValue="Devid Jhon"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                                                htmlFor="phoneNumber"
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                placeholder="+990 3343 7865"
                                                defaultValue="+990 3343 7865"
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
                                                placeholder="devidjond45@gmail.com"
                                                defaultValue="devidjond45@gmail.com"
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
                                                defaultValue="devidjond45@ub.edu.bz"
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
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                                            htmlFor="Title"
                                        >
                                            Title
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4"></span>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                type="Title"
                                                name="Title"
                                                id="Title"
                                                placeholder="Database Administrator"
                                                defaultValue="Databse Administrator "
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white text-left"
                                            htmlFor="Username"
                                        >
                                            Username
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="Username"
                                            id="Username"
                                            placeholder="devidjhon24"
                                            defaultValue="devidjhon24"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="submit"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                        >
                                            Save
                                        </button>
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
