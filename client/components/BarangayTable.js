import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { Icon } from "@iconify/react";
import ClickAwayListener from "react-click-away-listener";
import arraySort from "array-sort";
import useSWR, { useSWRConfig } from "swr";

function BarangayTable({
    filteredBarangays,
    fetchBarangays,
    fetchUserBarangays,
}) {
    const [barangayName, setBarangayName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [isDropdownMenuOpenBarangay, setIsDropdownMenuOpenBarangay] =
        useState(false);
    const [dropdownMenuValue, setDropdownMenuValue] = useState("Add");
    const [barangayUsers, setBarangayUsers] = useState([]);
    const dropdownRef = useRef();
    const [columnName, setColumnName] = useState("id");
    const [boolean, setBoolean] = useState(false);
    const { mutate } = useSWRConfig();
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [barangayId, setBarangayId] = useState(null);

    const sort = (columnName) => {
        setColumnName(columnName);
        setBoolean(!boolean);
    };

    const { data: barangays } = useSWR(
        "http://localhost:3001/barangay/getAllBarangays"
    );

    const addBarangay = async (e) => {
        e.preventDefault();
        if (barangayName != "" && districtName != "") {
            const data = {
                barangayName: barangayName,
                districtName: districtName,
            };
            await Axios.post("http://localhost:3001/barangay", data).then(
                (res) => {
                    console.log(res);
                    alert("Successfully added barangay");
                }
            );
            setBarangayName("");
            setDistrictName("");
            mutate("http://localhost:3001/barangay");
            mutate("http://localhost:3001/user/barangay");
        } else {
            alert("Please fill in all the forms");
        }
    };

    const editBarangay = async (e) => {
        e.preventDefault();
        if (barangayName != "" && districtName != "") {
            const data = {
                barangayName: barangayName,
                districtName: districtName,
                barangayId: barangayId,
            };
            await Axios.put(
                "http://localhost:3001/barangay/editBarangay",
                data
            ).then((res) => {
                alert("Successfully edited barangay");
            });
            setBarangayName("");
            setDistrictName("");
            setDropdownMenuValueBarangay("Barangay");
            setDropdownMenuValueDistrict("District");
            mutate("http://localhost:3001/barangay/getAllBarangays");
            mutate("http://localhost:3001/user/barangay");
        } else {
            alert("Please fill in all the forms");
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <form
                spellCheck="false"
                onSubmit={(e) => {
                    if (dropdownMenuValue == "Add") {
                        addBarangay(e);
                    } else {
                        editBarangay(e);
                    }
                }}
                className="w-full mr-6 md:max-w-xs"
            >
                <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">
                        {dropdownMenuValue == "Add" ? "Add" : "Edit"} barangay
                    </p>
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
                                    className={`flex items-center justify-between w-20 px-3 py-2 border cursor-pointer`}
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
                                    <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[42px] w-20 dark:bg-gray-700 shadow-lg">
                                        <ul className="text-gray-700 bg-white">
                                            <li
                                                className="block px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setDropdownMenuValue("Add");
                                                    setIsDropdownMenuOpen(
                                                        false
                                                    );
                                                    setBarangayName("");
                                                    setDistrictName("");
                                                    setDropdownMenuValueBarangay(
                                                        "Barangay"
                                                    );
                                                    setDropdownMenuValueDistrict(
                                                        "District"
                                                    );
                                                }}
                                            >
                                                Add
                                            </li>
                                            <li
                                                className="block px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setDropdownMenuValue(
                                                        "Edit"
                                                    );
                                                    setIsDropdownMenuOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                Edit
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>

                {dropdownMenuValue == "Edit" && (
                    <div>
                        <p className="mt-6 mb-1 text-sm text-gray-600">
                            Barangay
                        </p>
                        <div className="relative">
                            <ClickAwayListener
                                onClickAway={() =>
                                    setIsDropdownMenuOpenBarangay(false)
                                }
                                className="relative"
                            >
                                <div className="select-none">
                                    <div
                                        onClick={() =>
                                            setIsDropdownMenuOpenBarangay(
                                                !isDropdownMenuOpenBarangay
                                            )
                                        }
                                        className={`flex items-center justify-between w-full px-3 py-2 border cursor-pointer`}
                                    >
                                        <p
                                            className={`${
                                                dropdownMenuValueBarangay ==
                                                    "Barangay" &&
                                                dropdownMenuValueDistrict ==
                                                    "District" &&
                                                "text-gray-400"
                                            }`}
                                        >
                                            {dropdownMenuValueBarangay}
                                            &nbsp;-&nbsp;
                                            {dropdownMenuValueDistrict}
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
                                    {isDropdownMenuOpenBarangay && (
                                        <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[42px] w-full dark:bg-gray-700 shadow-lg">
                                            <ul className="text-gray-700 bg-white">
                                                {barangays.map(
                                                    (barangay, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                onClick={() => {
                                                                    setDropdownMenuValueBarangay(
                                                                        barangay.barangayName
                                                                    );
                                                                    setDropdownMenuValueDistrict(
                                                                        barangay.districtName
                                                                    );
                                                                    setBarangayId(
                                                                        barangay.id
                                                                    );
                                                                    setBarangayName(
                                                                        barangay.barangayName
                                                                    );
                                                                    setDistrictName(
                                                                        barangay.districtName
                                                                    );
                                                                    setIsDropdownMenuOpenBarangay(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <a
                                                                    href="#"
                                                                    className="block px-3 py-2 hover:bg-gray-100"
                                                                >
                                                                    {
                                                                        barangay.barangayName
                                                                    }
                                                                    &nbsp; -
                                                                    &nbsp;
                                                                    {
                                                                        barangay.districtName
                                                                    }
                                                                </a>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </ClickAwayListener>
                        </div>
                    </div>
                )}

                <div className="mt-6 mb-4">
                    <p className="mb-1 text-sm text-gray-600">Barangay name</p>
                    <input
                        value={barangayName}
                        onChange={(e) => setBarangayName(e.target.value)}
                        className="w-full px-3 py-2 border"
                        type="text"
                        placeholder="Barangay name"
                    />
                </div>

                <div className="mt-6 mb-8">
                    <p className="mb-1 text-sm text-gray-600">District name</p>
                    <input
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        className="w-full px-3 py-2 border"
                        type="text"
                        placeholder="District name"
                    />
                </div>

                <div className="flex items-center justify-end mb-4">
                    <button
                        type="submit"
                        className="flex items-center justify-center px-4 py-2 text-white transition-colors bg-blue-500 border border-blue-500 rounded-sm hover:bg-blue-600"
                    >
                        <Icon
                            icon={`${
                                dropdownMenuValue == "Add"
                                    ? "ic:baseline-add-circle"
                                    : "ic:baseline-mode-edit"
                            }`}
                            className="w-6 h-6 mr-2"
                        />
                        {dropdownMenuValue == "Add" ? "Add" : "Edit"}
                    </button>
                </div>
            </form>
            <div
                className={`overflow-auto border h-fit max-h-[500px] flex-grow ${
                    filteredBarangays && "border-x border-t border-b-0"
                }`}
            >
                <div className="w-0 md:w-full">
                    <table className="text-sm text-left md:w-full">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">
                                    <div
                                        onClick={() => sort("id")}
                                        className="flex items-center cursor-pointer group w-fit"
                                    >
                                        <p className="w-fit">No.</p>
                                        <Icon
                                            className={`w-5 h-5 invisible group-hover:visible `}
                                            icon={`${
                                                boolean == true
                                                    ? "eva:arrow-ios-downward-fill"
                                                    : "eva:arrow-ios-upward-fill"
                                            }`}
                                        />
                                    </div>
                                </th>
                                <th className="px-6">
                                    <div
                                        onClick={() => sort("barangayName")}
                                        className="flex items-center cursor-pointer group w-fit"
                                    >
                                        <p className="w-fit">Barangay Name</p>
                                        <Icon
                                            className={`w-5 h-5 invisible group-hover:visible `}
                                            icon={`${
                                                boolean == true
                                                    ? "eva:arrow-ios-downward-fill"
                                                    : "eva:arrow-ios-upward-fill"
                                            }`}
                                        />
                                    </div>
                                </th>
                                <th className="px-6">
                                    <div
                                        onClick={() => sort("districtName")}
                                        className="flex items-center cursor-pointer group w-fit"
                                    >
                                        <p className="w-fit">District Name</p>
                                        <Icon
                                            className={`w-5 h-5 invisible group-hover:visible `}
                                            icon={`${
                                                boolean == true
                                                    ? "eva:arrow-ios-downward-fill"
                                                    : "eva:arrow-ios-upward-fill"
                                            }`}
                                        />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {arraySort(filteredBarangays, columnName, {
                                reverse: boolean,
                            }).map((barangay, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">{index + 1}</td>
                                        <td className="px-6">
                                            {barangay.barangayName}
                                        </td>
                                        <td className="px-6">
                                            {barangay.districtName}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BarangayTable;
