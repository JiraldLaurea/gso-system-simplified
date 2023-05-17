import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ClickAwayListener from "react-click-away-listener";
import { useAuthDispatch } from "../context/auth";

function encode() {
    const router = useRouter();
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [dropdownMenuValue, setDropdownMenuValue] = useState("Select");
    const [barangayId, setBarangayId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch("CHANGE_TITLE", "Encode");
        dispatch("HAS_BUTTON_FALSE");
    }, []);

    return (
        <div className="">
            <div className="p-4 md:p-8">
                <div>
                    <p className="mb-1 text-sm text-gray-600">Select</p>
                    <div className="relative">
                        <ClickAwayListener
                            onClickAway={() => setIsDropdownMenuOpen(false)}
                            className="relative"
                        >
                            <div
                                className="select-none w-fit"
                                onMouseLeave={() =>
                                    setIsDropdownMenuOpen(false)
                                }
                            >
                                <div
                                    onMouseOver={() =>
                                        setIsDropdownMenuOpen(true)
                                    }
                                    className={`flex items-center justify-between w-56 px-3 py-2 border cursor-pointer`}
                                >
                                    <p
                                        className={`${
                                            dropdownMenuValue == "Select" &&
                                            "text-gray-400"
                                        }`}
                                    >
                                        {dropdownMenuValue}
                                    </p>
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </div>
                                {isDropdownMenuOpen && (
                                    <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[42px] w-56 dark:bg-gray-700 shadow-lg">
                                        <ul className="text-gray-700 bg-white">
                                            <li
                                                onClick={() => {
                                                    router.push(
                                                        "/encode/swmPlan"
                                                    );
                                                    setIsDropdownMenuOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                <a
                                                    href="#"
                                                    className="block px-3 py-2 hover:bg-gray-100"
                                                >
                                                    SWM Plan
                                                </a>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    router.push(
                                                        "/encode/recyclableWastes"
                                                    );
                                                    setIsDropdownMenuOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                <a
                                                    href="#"
                                                    className="block px-3 py-2 hover:bg-gray-100"
                                                >
                                                    Recyclable wastes
                                                </a>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    router.push(
                                                        "/encode/actualWastes"
                                                    );
                                                    setIsDropdownMenuOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                <a
                                                    href="#"
                                                    className="block px-3 py-2 hover:bg-gray-100"
                                                >
                                                    Actual wastes
                                                </a>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    router.push(
                                                        "/encode/collectionSchedule"
                                                    );
                                                    setIsDropdownMenuOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                <a
                                                    href="#"
                                                    className="block px-3 py-2 hover:bg-gray-100"
                                                >
                                                    Collection Schedule
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default encode;
