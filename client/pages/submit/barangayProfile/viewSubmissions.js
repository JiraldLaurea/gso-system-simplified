import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import Axios from "axios";
import fileDownload from "js-file-download";
import { Document, Page } from "react-pdf";
import { getStorage, ref } from "firebase/storage";
import { storage } from "../../../firebase";

function viewSubmissions({ yearOfSubmissions }) {
    const [yearSubmitted, setYearSubmitted] = useState(null);
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [dropdownMenuValue, setDropdownMenuValue] = useState("Year");
    const [isViewed, setIsViewed] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [submissionBarangayProfileUrl, setSubmissionBarangayProfileUrl] =
        useState();
    const storage = getStorage();

    const download = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                yearSubmitted: dropdownMenuValue,
            };

            await Axios.post(
                "http://localhost:3001/shortenedSubmission/getShortenedBarangayProfileUrl",
                data
            ).then((res) => {
                const documentName = res.data.documentName;
                Axios({
                    url: "http://localhost:3001/download",
                    method: "POST",
                    responseType: "blob",
                    data: {
                        submissionBarangayProfileUrl:
                            res.data.submissionBarangayProfileUrl,
                    },
                }).then((res) => {
                    console.log(res);
                    fileDownload(res.data, documentName);
                    setLoadingDownload(false);
                });
            });
        }
    };

    const viewSubmission = async (e) => {
        const data = {
            yearSubmitted: dropdownMenuValue,
        };

        await Axios.post(
            "http://localhost:3001/shortenedSubmission/getShortenedBarangayProfileUrl",
            data
        ).then((res) => {
            // documentName = res.data.documentName;
            setSubmissionBarangayProfileUrl(
                res.data.submissionBarangayProfileUrl
            );
        });
    };

    return (
        <div className="flex flex-col w-full ">
            <div className="p-8">
                <h2 className="mb-8 text-xl font-medium">View submissions</h2>
                <div className="my-4">
                    <p className="mb-1 text-sm text-gray-600">
                        Year of submission:
                    </p>
                    <div className="flex items-center">
                        <div className="relative">
                            <ClickAwayListener
                                onClickAway={() => setIsDropdownMenuOpen(false)}
                                className="relative"
                            >
                                <div className="select-none w-fit">
                                    <div
                                        onClick={() =>
                                            setIsDropdownMenuOpen(
                                                !isDropdownMenuOpen
                                            )
                                        }
                                        className={`flex items-center justify-between w-40 px-3 py-2 border cursor-pointer`}
                                    >
                                        <p
                                            className={`${
                                                dropdownMenuValue == "Year" &&
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
                                        <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[34px] shadow-lg w-40 dark:bg-gray-700">
                                            <ul className="text-gray-700">
                                                {yearOfSubmissions.map(
                                                    (
                                                        yearOfSubmission,
                                                        index
                                                    ) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                onClick={() => {
                                                                    setDropdownMenuValue(
                                                                        yearOfSubmission.yearSubmitted
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
                                                                    {
                                                                        yearOfSubmission.yearSubmitted
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
                        {dropdownMenuValue != "Year" && (
                            <>
                                <button
                                    onClick={() => {
                                        setIsViewed(true);
                                        viewSubmission();
                                    }}
                                    className="px-4 py-2 ml-4 text-blue-600 border select-none"
                                >
                                    View submission
                                </button>

                                <button
                                    onClick={download}
                                    className={`px-4 py-2 ml-4 text-white bg-blue-500 border border-blue-500 select-none ${
                                        loadingDownload && "cursor-not-allowed"
                                    }`}
                                >
                                    {!loadingDownload
                                        ? "Download"
                                        : "Processing..."}
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {isViewed && (
                    <>
                        {submissionBarangayProfileUrl && (
                            <iframe
                                className="w-full h-[800px]"
                                // src={`../submissions/${viewDocumentName}`}
                                src={`${submissionBarangayProfileUrl}`}
                            ></iframe>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default viewSubmissions;

export const getServerSideProps = async (context) => {
    const me = await fetch("http://localhost:3001/user/me", {
        headers: { Cookie: context.req.headers.cookie },
    }).then((res) => res.json());

    if (me.isAdmin == true) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    const yearOfSubmissions = await fetch(
        "http://localhost:3001/shortenedSubmission/getSubmittedBarangayProfilePageYear",
        {
            headers: { Cookie: context.req.headers.cookie },
        }
    ).then((res) => res.json());

    return {
        props: {
            yearOfSubmissions: yearOfSubmissions,
        },
    };
};
