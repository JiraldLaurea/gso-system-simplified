import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon } from "@iconify/react";
import ClickAwayListener from "react-click-away-listener";
import useSWR from "swr";
import { useAuthDispatch } from "../../context/auth";

function collectionSchedule() {
    useEffect(() => {
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_TITLE", "Collection schedule");
        dispatch("CHANGE_PATH", "/encode");
    }, []);

    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [routeNum, setRouteNum] = useState(0);
    const [truckNum, setTruckNum] = useState(0);
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [loading, setLoading] = useState(false);
    const [barangayId, setBarangayId] = useState(null);
    const dispatch = useAuthDispatch();

    const { data: barangays } = useSWR(
        "http://localhost:3001/barangay/getAllBarangay"
    );

    const submit = async () => {
        setLoading(true);
        if (
            dropdownMenuValueBarangay != "Barangay" &&
            routeNum != 0 &&
            truckNum != 0
        ) {
            const data = {
                barangayName: dropdownMenuValueBarangay,
                districtName: dropdownMenuValueDistrict,
                routeNum: routeNum,
                truckNum: truckNum,
            };

            await Axios.post(
                "http://localhost:3001/collectionSchedule/createCollectionSchedule",
                data
            ).then(() => {
                alert("Collection schedule successfully submitted.");
                setLoading(false);
            });
        } else {
            alert("Please fill in all the forms");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="p-4 md:p-8">
                <p className="mb-1 text-sm text-gray-600">Barangay</p>
                <div className="relative mb-4">
                    <ClickAwayListener
                        onClickAway={() => setIsDropdownMenuOpen(false)}
                        className="relative"
                    >
                        <div className="select-none w-fit">
                            <div
                                onClick={() =>
                                    setIsDropdownMenuOpen(!isDropdownMenuOpen)
                                }
                                className={`flex items-center justify-between w-56 px-3 py-2 border cursor-pointer`}
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
                            {isDropdownMenuOpen && (
                                <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[42px] w-56 dark:bg-gray-700 shadow-lg">
                                    <ul className="text-gray-700 bg-white">
                                        {barangays.map((barangay, index) => {
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
                                                        setIsDropdownMenuOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <a
                                                        href="#"
                                                        className="block px-3 py-2 hover:bg-gray-100"
                                                    >
                                                        {barangay.barangayName}
                                                        &nbsp; - &nbsp;
                                                        {barangay.districtName}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </ClickAwayListener>

                    <p className="mt-4 mb-1 text-sm text-gray-600">
                        Route number
                    </p>
                    <div className="flex mb-3 removeInputNumberArrows">
                        <input
                            value={routeNum}
                            onChange={(e) => setRouteNum(e.target.value)}
                            type="number"
                            className={`appearance-none px-2 h-[36px] w-[176.4px] border focus:outline-none text-left`}
                            placeholder="Route number"
                        />
                    </div>
                    <p className="mt-4 mb-1 text-sm text-gray-600">
                        Truck number
                    </p>
                    <div className="flex mb-3 removeInputNumberArrows">
                        <input
                            value={truckNum}
                            onChange={(e) => setTruckNum(e.target.value)}
                            type="number"
                            className={`appearance-none px-2 h-[36px] w-[176.4px] border focus:outline-none text-left`}
                            placeholder="Truck number"
                        />
                    </div>

                    <button
                        onClick={() => {
                            if (!loading) {
                                submit();
                            }
                        }}
                        className={`px-3 hover:bg-blue-600 flex items-center justify-center w-36 transition-colors py-2 mt-8 mb-4 text-white bg-blue-500 rounded-sm ${
                            loading && "cursor-not-allowed"
                        } `}
                    >
                        {!loading ? (
                            <>
                                <Icon
                                    icon="fluent:document-arrow-up-20-filled"
                                    className="w-6 h-6 mr-2"
                                />
                                Encode
                            </>
                        ) : (
                            <>
                                <Icon
                                    icon="eos-icons:loading"
                                    className="w-6 h-6 mr-2"
                                />
                                Processing...
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default collectionSchedule;
