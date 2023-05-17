import Axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import fileDownload from "js-file-download";
import arraySort from "array-sort";
import { Icon } from "@iconify/react";

function SubmissionTable({ filteredSubmissions }) {
    const documentNameRef = useRef([]);
    const [columnName, setColumnName] = useState("createdAt");
    const [boolean, setBoolean] = useState(true);

    const sort = (columnName) => {
        setColumnName(columnName);
        setBoolean(!boolean);
    };

    return (
        <div
            className={`overflow-auto border max-h-[500px] ${
                filteredSubmissions && "border-x border-t border-b-0"
            }`}
        >
            <div className="w-0">
                <table className="text-sm text-left">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                        <tr className="select-none removeBorderStyle">
                            <th className="px-6 ">
                                <div
                                    onClick={() => sort("index")}
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
                            <th className="px-6 min-w-[190px]">
                                <div
                                    onClick={() => sort("barangayName")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Barangay
                                    </p>
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
                                    <p className="cursor-pointer w-fit">
                                        District
                                    </p>
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
                                    onClick={() => sort("yearSubmitted")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Year submitted
                                    </p>
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
                                    onClick={() => sort("barangayProfile")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Barangay profile
                                    </p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Sketch
                                    </p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Programs Document
                                    </p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Funding Requirement
                                    </p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">Moa</p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Junkshop in the barangay
                                    </p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Business permit
                                    </p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">Eo</p>
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
                                    onClick={() => sort("createdAt")}
                                    className="flex items-center cursor-pointer group w-fit"
                                >
                                    <p className="cursor-pointer w-fit">
                                        Barangay ordinance
                                    </p>
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
                            {/* <th className="px-6 text-right">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {arraySort(filteredSubmissions, columnName, {
                            reverse: boolean,
                        }).map((submission, index) => {
                            let timestamp = submission.createdAt;
                            let date = new Date(timestamp);
                            let minutes = 0;

                            if (date.getMinutes() < 10) {
                                minutes = "0" + date.getMinutes();
                            } else {
                                minutes = date.getMinutes();
                            }

                            return (
                                <Fragment key={index}>
                                    {
                                        <tr className="border-b removeBorderStyle h-11">
                                            <td className="px-6">
                                                {index + 1}
                                            </td>
                                            <td className="px-6">
                                                {submission.barangayName}
                                            </td>
                                            <td className="px-6">
                                                {submission.districtName}
                                            </td>
                                            <td className="px-6">
                                                {submission.yearSubmitted}
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
                                        </tr>
                                    }
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SubmissionTable;
