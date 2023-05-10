import Axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import numeral from "numeral";
import ClickAwayListener from "react-click-away-listener";
import moment from "moment";
import { useAuthDispatch } from "../context/auth";
import { Icon } from "@iconify/react";
import ProjectedWastes from "../components/ProjectedWastes";
import { useRouter } from "next/router";

function statistics() {
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [dropDownMenuValue, setDropDownMenuValue] = useState(null);
    const [fromDatePicker, setFromDatePicker] = useState("");
    const [toDatePicker, setToDatePicker] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const [recyclableWastes, setRecyclableWastes] = useState([]);
    const router = useRouter();

    const dispatch = useAuthDispatch();

    const { data: user } = useSWR("http://localhost:3001/user/me");

    const { data: barangays } = useSWR(
        "http://localhost:3001/barangay/getAllBarangay"
    );

    const { data: submissionsUser } = useSWR(
        "http://localhost:3001/shortenedSubmission/getAllSubmissionUser"
    );

    const { data: recyclableWastesUser } = useSWR(
        "http://localhost:3001/recyclableWastes/getRecyclableWastesUser"
    );

    useEffect(() => {
        dispatch("CHANGE_TITLE", "Statistics");
        dispatch("HAS_BUTTON_FALSE");
    }, []);

    const displaySubmissions = async () => {
        if (dropDownMenuValue != "All") {
            const data = {
                barangayId: dropDownMenuValue,
            };
            await Axios.post(
                "http://localhost:3001/shortenedSubmission/getAllSubmission",
                data
            ).then((res) => {
                setSubmissions(res.data);
            });
        } else {
            await Axios.get(
                "http://localhost:3001/shortenedSubmission/getAllSubmissions"
            ).then((res) => {
                setSubmissions(res.data);
            });
        }
    };

    const displayRecyclableWastes = async () => {
        const data = {
            barangayId: dropDownMenuValue,
        };
        await Axios.post(
            "http://localhost:3001/recyclableWastes/getRecyclableWastes",
            data
        ).then((res) => {
            setRecyclableWastes(res.data);
        });
    };

    useEffect(() => {
        if (dropDownMenuValue != null) {
            displaySubmissions();
            if (dropDownMenuValue != "All") {
                displayRecyclableWastes();
            }
        }
    }, [dropDownMenuValue]);

    return (
        <div className="">
            <div className="p-4 md:p-8">
                {user?.isAdmin && (
                    <div>
                        <p className="mb-1 text-sm text-gray-600">Barangay</p>
                        <div className="flex">
                            <div className="relative mb-6">
                                <ClickAwayListener
                                    onClickAway={() =>
                                        setIsDropdownMenuOpen(false)
                                    }
                                    className="relative"
                                >
                                    <div className="select-none w-fit">
                                        <div
                                            onClick={() =>
                                                setIsDropdownMenuOpen(
                                                    !isDropdownMenuOpen
                                                )
                                            }
                                            className={`flex items-center justify-between w-96 px-3 py-2 border cursor-pointer`}
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
                                                {dropdownMenuValueBarangay !=
                                                    "All" && " - "}
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
                                            <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[42px] w-96 dark:bg-gray-700 shadow-lg">
                                                <ul className="text-gray-700 bg-white">
                                                    <li
                                                        onClick={() => {
                                                            setDropdownMenuValueBarangay(
                                                                "All"
                                                            );
                                                            setDropdownMenuValueDistrict(
                                                                ""
                                                            );
                                                            setIsDropdownMenuOpen(
                                                                false
                                                            );
                                                            setDropDownMenuValue(
                                                                "All"
                                                            );
                                                            setFromDatePicker(
                                                                ""
                                                            );
                                                            setToDatePicker("");
                                                        }}
                                                    >
                                                        <a
                                                            href="#"
                                                            className="block px-3 py-2 hover:bg-gray-100"
                                                        >
                                                            All
                                                        </a>
                                                    </li>
                                                    {barangays.map(
                                                        (barangay, index) => {
                                                            return (
                                                                <li
                                                                    key={
                                                                        barangay.id
                                                                    }
                                                                    onClick={() => {
                                                                        setDropdownMenuValueBarangay(
                                                                            barangay.barangayName
                                                                        );
                                                                        setDropdownMenuValueDistrict(
                                                                            barangay.districtName
                                                                        );
                                                                        setIsDropdownMenuOpen(
                                                                            false
                                                                        );
                                                                        setDropDownMenuValue(
                                                                            barangay.id
                                                                        );
                                                                        setFromDatePicker(
                                                                            ""
                                                                        );
                                                                        setToDatePicker(
                                                                            ""
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
                            <button
                                onClick={() => {
                                    router.push("/statistics/viewCalajunanDB");
                                }}
                                className={`px-3 ml-4 h-[42px] hover:bg-blue-600 flex items-center justify-center w-56 transition-colors py-1 text-white bg-blue-500 rounded-sm
                    
                     `}
                            >
                                <Icon
                                    icon="ic:baseline-remove-red-eye"
                                    className="w-6 h-6 mr-2"
                                />
                                View Calajunan DB
                            </button>
                        </div>
                    </div>
                )}

                <div className={`flex items-center mb-4`}>
                    <p className="mr-4 text-lg font-semibold">Wastes Report</p>
                </div>

                {user?.isAdmin && (
                    <>
                        {dropdownMenuValueBarangay != "Barangay" ? (
                            <div className="overflow-x-auto border max-h-[500px]">
                                <div className="w-full">
                                    <table className="w-full text-sm text-left">
                                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                                            <tr className="removeBorderStyle">
                                                {dropDownMenuValue == "All" && (
                                                    <>
                                                        <th className="px-6">
                                                            <p>Barangay name</p>
                                                        </th>
                                                        <th className="px-6">
                                                            <p>District name</p>
                                                        </th>
                                                    </>
                                                )}

                                                <th className="px-6">
                                                    <p>Year submitted</p>
                                                </th>
                                                <th className="px-6 ">
                                                    <p className="text-right">
                                                        Population count
                                                    </p>
                                                </th>
                                                <th className="flex items-center justify-end px-6 h-11">
                                                    <p className="w-32 text-right">
                                                        Estimated waste
                                                        generated
                                                    </p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submissions?.map(
                                                (submission, index) => {
                                                    const wasteGenerated =
                                                        (
                                                            submission.populationCount *
                                                            0.68
                                                        ).toFixed(2) + "kg";

                                                    return (
                                                        <tr
                                                            key={submission.id}
                                                            className="border-b removeBorderStyle h-11 last:border-b-0"
                                                        >
                                                            {dropDownMenuValue ==
                                                                "All" && (
                                                                <>
                                                                    <td className="px-6">
                                                                        {
                                                                            submission.barangayName
                                                                        }
                                                                    </td>
                                                                    <td className="px-6">
                                                                        {
                                                                            submission.districtName
                                                                        }
                                                                    </td>
                                                                </>
                                                            )}

                                                            <td className="px-6">
                                                                {
                                                                    submission.yearSubmitted
                                                                }
                                                            </td>
                                                            <td className="px-6 text-right">
                                                                {numeral(
                                                                    submission.populationCount
                                                                ).format("0,0")}
                                                            </td>
                                                            <td className="px-6 text-right">
                                                                {numeral(
                                                                    wasteGenerated
                                                                ).format(
                                                                    "0,0.00"
                                                                )}{" "}
                                                                kg
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No barangay selected.
                            </p>
                        )}
                    </>
                )}

                {!user?.isAdmin && submissionsUser && (
                    <>
                        <div className="overflow-x-auto border max-h-[500px]">
                            <div className="w-full">
                                <table className="w-full text-sm text-left">
                                    <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                                        <tr className="removeBorderStyle">
                                            <th className="px-6">
                                                <p>Year submitted</p>
                                            </th>
                                            <th className="px-6 ">
                                                <p className="text-right">
                                                    Population count
                                                </p>
                                            </th>
                                            <th className="px-6 ">
                                                <p className="text-right">
                                                    Waste generated
                                                </p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submissionsUser?.map(
                                            (submission, index) => {
                                                const wasteGenerated =
                                                    (
                                                        submission.populationCount *
                                                        0.68
                                                    ).toFixed(2) + "kg";

                                                return (
                                                    <tr
                                                        key={submission.id}
                                                        className="border-b removeBorderStyle h-11 last:border-b-0"
                                                    >
                                                        <td className="px-6">
                                                            {
                                                                submission.yearSubmitted
                                                            }
                                                        </td>
                                                        <td className="px-6 text-right">
                                                            {numeral(
                                                                submission.populationCount
                                                            ).format("0,0")}
                                                        </td>
                                                        <td className="px-6 text-right">
                                                            {numeral(
                                                                wasteGenerated
                                                            ).format(
                                                                "0,0.00"
                                                            )}{" "}
                                                            kg
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex items-center mt-6 mb-4">
                    <p className="mr-4 text-lg font-semibold">
                        Submissions Report
                    </p>
                </div>

                {user?.isAdmin && (
                    <>
                        {dropdownMenuValueBarangay != "Barangay" ? (
                            <div className="overflow-auto border max-h-[500px]">
                                <div className="w-0">
                                    <table className="w-full text-sm text-left table-fixed">
                                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                                            <tr className="removeBorderStyle">
                                                {dropDownMenuValue == "All" && (
                                                    <>
                                                        <th className="px-6 w-28">
                                                            <p>Barangay name</p>
                                                        </th>
                                                        <th className="px-6 w-28">
                                                            <p>District name</p>
                                                        </th>
                                                    </>
                                                )}
                                                <th className="w-20 px-6">
                                                    <p>Year submitted</p>
                                                </th>
                                                <th className="w-20 px-6">
                                                    <p className=" w-fit">
                                                        Barangay profile
                                                    </p>
                                                </th>
                                                <th className="w-16 px-6">
                                                    <p className=" w-fit">
                                                        Sketch
                                                    </p>
                                                </th>
                                                <th className="w-20 px-6">
                                                    <p className=" w-fit">
                                                        Programs
                                                    </p>
                                                </th>
                                                <th className="w-24 px-6">
                                                    <p className=" w-fit">
                                                        Funding Requirement
                                                    </p>
                                                </th>
                                                <th className="w-10 px-6">
                                                    <p className=" w-fit">
                                                        Moa
                                                    </p>
                                                </th>
                                                <th className="w-20 px-6">
                                                    <p className=" w-fit">
                                                        Junkshop
                                                    </p>
                                                </th>
                                                <th className="w-20 px-6">
                                                    <p className=" w-fit">
                                                        Business permit
                                                    </p>
                                                </th>
                                                <th className="w-10 px-6">
                                                    <p className=" w-fit">EO</p>
                                                </th>
                                                <th className="w-16 px-6">
                                                    EO no
                                                </th>
                                                <th className="w-10 px-6">
                                                    <p className=" w-fit">BO</p>
                                                </th>
                                                <th className="w-16 px-6">
                                                    BO no
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submissions?.map(
                                                (submission, index) => {
                                                    const wasteGenerated =
                                                        (
                                                            submission.populationCount *
                                                            0.68
                                                        ).toFixed(2) + "kg";

                                                    return (
                                                        <tr
                                                            key={submission.id}
                                                            className="border-b removeBorderStyle h-11"
                                                        >
                                                            {dropDownMenuValue ==
                                                                "All" && (
                                                                <>
                                                                    <td className="px-6">
                                                                        {
                                                                            submission.barangayName
                                                                        }
                                                                    </td>
                                                                    <td className="px-6">
                                                                        {
                                                                            submission.districtName
                                                                        }
                                                                    </td>
                                                                </>
                                                            )}
                                                            <td className="px-6">
                                                                {
                                                                    submission.yearSubmitted
                                                                }
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.barangayProfile ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.sketch ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.programsDoc ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.fundingReq ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.moa ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.junkshopInBarangay ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.businessPermit ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.executiveOrder ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {
                                                                    submission.executiveOrderNo
                                                                }
                                                            </td>
                                                            <td className="px-6">
                                                                {submission.barangayOrdinance ? (
                                                                    <Icon
                                                                        icon="ic:baseline-check"
                                                                        className="w-5 h-5 text-green-600"
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        icon="ic:baseline-close"
                                                                        className="w-5 h-5 text-red-600"
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="px-6">
                                                                {
                                                                    submission.barangayOrdinanceNo
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No barangay selected.
                            </p>
                        )}
                    </>
                )}

                {!user?.isAdmin && submissionsUser && (
                    <>
                        <div className="overflow-auto border max-h-[500px]">
                            <div className="w-0">
                                <table className="w-full text-sm text-left table-fixed">
                                    <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                                        <tr className="removeBorderStyle">
                                            <th className="w-20 px-6">
                                                <p>Year submitted</p>
                                            </th>
                                            <th className="w-20 px-6">
                                                <p className=" w-fit">
                                                    Barangay profile
                                                </p>
                                            </th>
                                            <th className="w-16 px-6">
                                                <p className=" w-fit">Sketch</p>
                                            </th>
                                            <th className="w-20 px-6">
                                                <p className=" w-fit">
                                                    Programs
                                                </p>
                                            </th>
                                            <th className="w-24 px-6">
                                                <p className=" w-fit">
                                                    Funding Requirement
                                                </p>
                                            </th>
                                            <th className="w-10 px-6">
                                                <p className=" w-fit">Moa</p>
                                            </th>
                                            <th className="w-20 px-6">
                                                <p className=" w-fit">
                                                    Junkshop
                                                </p>
                                            </th>
                                            <th className="w-20 px-6">
                                                <p className=" w-fit">
                                                    Business permit
                                                </p>
                                            </th>
                                            <th className="w-10 px-6">
                                                <p className=" w-fit">EO</p>
                                            </th>
                                            <th className="w-16 px-6">EO no</th>
                                            <th className="w-10 px-6">
                                                <p className=" w-fit">BO</p>
                                            </th>
                                            <th className="w-16 px-6">BO no</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submissionsUser?.map((submission) => {
                                            return (
                                                <tr
                                                    key={submission.id}
                                                    className="border-b last:border-b-0 removeBorderStyle h-11"
                                                >
                                                    <td className="px-6">
                                                        {
                                                            submission.yearSubmitted
                                                        }
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.barangayProfile ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ant-design:minus-circle-filled"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.sketch ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.programsDoc ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.fundingReq ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.moa ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.junkshopInBarangay ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.businessPermit ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.executiveOrder ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {
                                                            submission.executiveOrderNo
                                                        }
                                                    </td>
                                                    <td className="px-6">
                                                        {submission.barangayOrdinance ? (
                                                            <Icon
                                                                icon="ic:baseline-check"
                                                                className="w-5 h-5 text-green-600"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                icon="ic:baseline-close"
                                                                className="w-5 h-5 text-red-600"
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="px-6">
                                                        {
                                                            submission.barangayOrdinanceNo
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
                {dropDownMenuValue != "All" && (
                    <>
                        <div className="flex items-center mt-6 mb-4">
                            <p className="mr-4 text-lg font-semibold">
                                Recyclable Wastes Report
                            </p>
                        </div>

                        {user?.isAdmin && (
                            <>
                                {dropdownMenuValueBarangay != "Barangay" &&
                                recyclableWastes.length != 0 ? (
                                    <>
                                        <div className="flex items-end mb-4 space-x-4">
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">
                                                    From:
                                                </p>
                                                <input
                                                    className="px-2 py-1 border"
                                                    type="month"
                                                    // id="fromDatePicker"
                                                    value={fromDatePicker}
                                                    onChange={(e) =>
                                                        setFromDatePicker(
                                                            e.target.value
                                                        )
                                                    }
                                                ></input>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">
                                                    To:
                                                </p>
                                                <input
                                                    className="px-2 py-1 border"
                                                    type="month"
                                                    // id="toDatePicker"
                                                    value={toDatePicker}
                                                    onChange={(e) =>
                                                        setToDatePicker(
                                                            e.target.value
                                                        )
                                                    }
                                                ></input>
                                            </div>
                                            {fromDatePicker && toDatePicker && (
                                                <div
                                                    onClick={() => {
                                                        setFromDatePicker("");
                                                        setToDatePicker("");
                                                    }}
                                                    className="flex items-center text-gray-600 h-9 hover:cursor-pointer group"
                                                >
                                                    <p className="group-hover:underline group-hover:text-black">
                                                        Clear
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="overflow-auto border max-h-[500px]">
                                            <div className="w-0">
                                                <table className="w-screen text-sm text-left">
                                                    <thead className="sticky top-0 w-full text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                                                        <tr className="removeBorderStyle">
                                                            <th className="px-6">
                                                                <div>
                                                                    <p className="w-32">
                                                                        Date
                                                                        submitted
                                                                    </p>
                                                                </div>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Saway
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Lata
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Plastic
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Mineral
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Botelya
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Carton
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Aluminum
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Sin
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Scrap
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Kaldero
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Others
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Total
                                                                </p>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {recyclableWastes?.map(
                                                            (
                                                                recyclableWaste,
                                                                index
                                                            ) => {
                                                                if (
                                                                    recyclableWaste.barangayId ==
                                                                    dropDownMenuValue
                                                                ) {
                                                                    let recyclableWasteDate =
                                                                        moment(
                                                                            recyclableWaste.dateSubmitted
                                                                        ).format(
                                                                            "yyyy-MM"
                                                                        );

                                                                    if (
                                                                        (recyclableWasteDate >=
                                                                            fromDatePicker &&
                                                                            recyclableWasteDate <=
                                                                                toDatePicker) ||
                                                                        (fromDatePicker ==
                                                                            "" &&
                                                                            toDatePicker ==
                                                                                "")
                                                                    ) {
                                                                        return (
                                                                            <tr
                                                                                key={
                                                                                    recyclableWaste.id
                                                                                }
                                                                                className="border-b removeBorderStyle h-11"
                                                                            >
                                                                                <td className="px-6">
                                                                                    {moment(
                                                                                        recyclableWaste.dateSubmitted
                                                                                    ).format(
                                                                                        "MMM YYYY"
                                                                                    )}
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.saway
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.lata
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.plastic
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.mineral
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.botelya
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.carton
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.aluminum
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.sin
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.scrap
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.kaldero
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.others
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                                <td className="px-6 text-right">
                                                                                    {numeral(
                                                                                        recyclableWaste.totalWeightPerBarangay
                                                                                    ).format(
                                                                                        "0,0.00"
                                                                                    )}
                                                                                    kg
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {recyclableWastes?.length == 0 &&
                                        dropdownMenuValueBarangay !=
                                            "Barangay" ? (
                                            <p className="text-gray-500">
                                                No recyclable waste submitted.
                                            </p>
                                        ) : (
                                            <p className="text-gray-500">
                                                No barangay selected.
                                            </p>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {!user?.isAdmin && (
                            <>
                                {recyclableWastesUser?.length != 0 ? (
                                    <>
                                        <div className="flex items-end mb-4 space-x-4">
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">
                                                    From:
                                                </p>
                                                <input
                                                    className="px-2 py-1 border"
                                                    type="month"
                                                    // id="fromDatePicker"
                                                    value={fromDatePicker}
                                                    onChange={(e) =>
                                                        setFromDatePicker(
                                                            e.target.value
                                                        )
                                                    }
                                                ></input>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">
                                                    To:
                                                </p>
                                                <input
                                                    className="px-2 py-1 border"
                                                    type="month"
                                                    // id="toDatePicker"
                                                    value={toDatePicker}
                                                    onChange={(e) =>
                                                        setToDatePicker(
                                                            e.target.value
                                                        )
                                                    }
                                                ></input>
                                            </div>
                                            {fromDatePicker && toDatePicker && (
                                                <div
                                                    onClick={() => {
                                                        setFromDatePicker("");
                                                        setToDatePicker("");
                                                    }}
                                                    className="flex items-center text-gray-600 h-9 hover:cursor-pointer group"
                                                >
                                                    <p className="group-hover:underline group-hover:text-black">
                                                        Clear
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="overflow-auto border max-h-[500px]">
                                            <div className="w-0">
                                                <table className="w-screen text-sm text-left">
                                                    <thead className="sticky top-0 w-full text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                                                        <tr className="removeBorderStyle">
                                                            <th className="px-6">
                                                                <div>
                                                                    <p className="w-32">
                                                                        Date
                                                                        submitted
                                                                    </p>
                                                                </div>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Saway
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Lata
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Plastic
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Mineral
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Botelya
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Carton
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Aluminum
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Sin
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Scrap
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Kaldero
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Others
                                                                </p>
                                                            </th>
                                                            <th className="px-6">
                                                                <p className="text-right">
                                                                    Total
                                                                </p>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {recyclableWastesUser?.map(
                                                            (
                                                                recyclableWaste,
                                                                index
                                                            ) => {
                                                                let recyclableWasteDate =
                                                                    moment(
                                                                        recyclableWaste.dateSubmitted
                                                                    ).format(
                                                                        "yyyy-MM"
                                                                    );

                                                                if (
                                                                    (recyclableWasteDate >=
                                                                        fromDatePicker &&
                                                                        recyclableWasteDate <=
                                                                            toDatePicker) ||
                                                                    (fromDatePicker ==
                                                                        "" &&
                                                                        toDatePicker ==
                                                                            "")
                                                                ) {
                                                                    return (
                                                                        <tr
                                                                            key={
                                                                                recyclableWaste.id
                                                                            }
                                                                            className="border-b removeBorderStyle h-11"
                                                                        >
                                                                            <td className="px-6">
                                                                                {moment(
                                                                                    recyclableWaste.dateSubmitted
                                                                                ).format(
                                                                                    "MMM YYYY"
                                                                                )}
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.saway
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.lata
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.plastic
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.mineral
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.botelya
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.carton
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.aluminum
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.sin
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.scrap
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.kaldero
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.others
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                            <td className="px-6 text-right">
                                                                                {numeral(
                                                                                    recyclableWaste.totalWeightPerBarangay
                                                                                ).format(
                                                                                    "0,0.00"
                                                                                )}
                                                                                kg
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-500">
                                        No recyclable waste submitted.
                                    </p>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default statistics;
